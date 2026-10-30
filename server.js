import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dataDirectory = join(root, "data");
const dataFile = join(dataDirectory, "aprendices.json");
const coursesFile = join(dataDirectory, "cursos.json");
const presentationFile = join(dataDirectory, "presentacion.json");
const port = Number(process.env.API_PORT || 3002);

mkdirSync(dataDirectory, { recursive: true });
for (const [file, initialValue] of [
    [dataFile, "[]\n"],
    [coursesFile, "[]\n"],
    [presentationFile, "null\n"]
]) {
    try {
        readFileSync(file, "utf8");
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
        writeFileSync(file, initialValue);
    }
}

function readAprendices() {
    const aprendices = JSON.parse(readFileSync(dataFile, "utf8"));
    if (!Array.isArray(aprendices)) {
        throw new Error("El archivo de aprendices debe contener una lista.");
    }
    return aprendices;
}

function sendJson(response, status, body) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(body));
}

async function readBody(request) {
    let body = "";
    for await (const chunk of request) {
        body += chunk;
        if (body.length > 1_000_000) {
            throw Object.assign(new Error("La solicitud es demasiado grande."), { status: 413 });
        }
    }
    try {
        return JSON.parse(body);
    } catch {
        throw Object.assign(new Error("El cuerpo debe ser JSON válido."), { status: 400 });
    }
}

function validateAprendiz(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw Object.assign(new Error("El cuerpo debe ser un objeto JSON."), { status: 400 });
    }

    if (typeof body.nombre !== "string" || !body.nombre.trim()) {
        throw Object.assign(new Error("El nombre del aprendiz es obligatorio."), { status: 400 });
    }
    if (body.correo !== undefined && typeof body.correo !== "string") {
        throw Object.assign(new Error("El correo debe ser texto."), { status: 400 });
    }

    return {
        nombre: body.nombre.trim(),
        correo: body.correo?.trim() || ""
    };
}

function validateCambiosAprendiz(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw Object.assign(new Error("El cuerpo debe ser un objeto JSON."), { status: 400 });
    }

    const cambios = {};
    if ("nombre" in body) {
        if (typeof body.nombre !== "string" || !body.nombre.trim()) {
            throw Object.assign(new Error("El nombre no puede estar vacío."), { status: 400 });
        }
        cambios.nombre = body.nombre.trim();
    }
    if ("correo" in body) {
        if (typeof body.correo !== "string") {
            throw Object.assign(new Error("El correo debe ser texto."), { status: 400 });
        }
        cambios.correo = body.correo.trim();
    }
    if (Object.keys(cambios).length === 0) {
        throw Object.assign(new Error("Indica al menos un campo para actualizar."), { status: 400 });
    }

    return cambios;
}

function validateCorreo(correo) {
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        throw Object.assign(new Error("El correo electrónico no tiene un formato válido."), { status: 400 });
    }
}

function validateCurso(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw Object.assign(new Error("El cuerpo debe ser un objeto JSON."), { status: 400 });
    }

    for (const field of ["nombre", "descripcion", "url"]) {
        if (typeof body[field] !== "string" || !body[field].trim()) {
            throw Object.assign(new Error(`El campo ${field} es obligatorio.`), { status: 400 });
        }
    }

    let url;
    try {
        url = new URL(body.url);
    } catch {
        throw Object.assign(new Error("La URL de la imagen no es válida."), { status: 400 });
    }
    if (!["http:", "https:"].includes(url.protocol)) {
        throw Object.assign(new Error("La imagen debe usar una URL HTTP o HTTPS."), { status: 400 });
    }

    return {
        nombre: body.nombre.trim(),
        descripcion: body.descripcion.trim(),
        url: body.url.trim()
    };
}

function validatePresentacion(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw Object.assign(new Error("El cuerpo debe ser un objeto JSON."), { status: 400 });
    }
    if (typeof body.nombre !== "string" || !body.nombre.trim()) {
        throw Object.assign(new Error("El nombre es obligatorio."), { status: 400 });
    }
    if (typeof body.curso !== "string" || !body.curso.trim()) {
        throw Object.assign(new Error("El curso de interés es obligatorio."), { status: 400 });
    }

    return { nombre: body.nombre.trim(), curso: body.curso.trim() };
}

const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    try {
        if (pathname === "/api/presentacion" && request.method === "GET") {
            sendJson(response, 200, JSON.parse(readFileSync(presentationFile, "utf8")));
            return;
        }

        if (pathname === "/api/presentacion" && request.method === "PUT") {
            const presentacion = validatePresentacion(await readBody(request));
            writeFileSync(presentationFile, `${JSON.stringify(presentacion, null, 2)}\n`);
            sendJson(response, 200, presentacion);
            return;
        }

        if (pathname === "/api/cursos" && request.method === "GET") {
            sendJson(response, 200, JSON.parse(readFileSync(coursesFile, "utf8")));
            return;
        }

        if (pathname === "/api/cursos" && request.method === "POST") {
            const body = await readBody(request);
            const cursoId = body && (typeof body.id === "string" || typeof body.id === "number")
                ? body.id
                : randomUUID();
            const curso = { id: cursoId, ...validateCurso(body) };
            const cursos = JSON.parse(readFileSync(coursesFile, "utf8"));
            const index = cursos.findIndex((actual) => String(actual.id) === String(cursoId));
            if (index === -1) {
                cursos.push(curso);
            } else {
                cursos[index] = curso;
            }
            writeFileSync(coursesFile, `${JSON.stringify(cursos, null, 2)}\n`);
            sendJson(response, index === -1 ? 201 : 200, curso);
            return;
        }

        if (pathname === "/api/aprendices" && request.method === "GET") {
            sendJson(response, 200, readAprendices());
            return;
        }

        if (pathname === "/api/aprendices" && request.method === "POST") {
            const body = await readBody(request);
            const datos = validateAprendiz(body);
            validateCorreo(datos.correo);
            const id = typeof body.id === "string" && body.id.trim()
                ? body.id.trim()
                : randomUUID();
            const aprendiz = { id, ...datos };
            const aprendices = readAprendices();
            const index = aprendices.findIndex((actual) => actual.id === id);
            if (index === -1) {
                aprendices.push(aprendiz);
            } else {
                aprendices[index] = aprendiz;
            }
            writeFileSync(dataFile, `${JSON.stringify(aprendices, null, 2)}\n`);
            sendJson(response, index === -1 ? 201 : 200, aprendiz);
            return;
        }

        const courseMatch = pathname.match(/^\/api\/cursos\/([^/]+)$/);
        if (courseMatch) {
            const courseId = decodeURIComponent(courseMatch[1]);
            const cursos = JSON.parse(readFileSync(coursesFile, "utf8"));
            const index = cursos.findIndex((curso) => String(curso.id) === courseId);

            if (request.method === "PUT") {
                if (index === -1) {
                    sendJson(response, 404, { error: "No se encontró el curso." });
                    return;
                }
                cursos[index] = {
                    id: cursos[index].id,
                    ...validateCurso(await readBody(request))
                };
                writeFileSync(coursesFile, `${JSON.stringify(cursos, null, 2)}\n`);
                sendJson(response, 200, cursos[index]);
                return;
            }

            if (request.method === "DELETE") {
                if (index === -1) {
                    sendJson(response, 404, { error: "No se encontró el curso." });
                    return;
                }
                cursos.splice(index, 1);
                writeFileSync(coursesFile, `${JSON.stringify(cursos, null, 2)}\n`);
                response.writeHead(204);
                response.end();
                return;
            }
        }

        const match = pathname.match(/^\/api\/aprendices\/([^/]+)$/);
        if (match) {
            const aprendizId = decodeURIComponent(match[1]);
            const aprendices = readAprendices();
            const index = aprendices.findIndex((aprendiz) => aprendiz.id === aprendizId);

            if (request.method === "GET") {
                if (index === -1) {
                    sendJson(response, 404, { error: "No se encontró el aprendiz." });
                    return;
                }
                sendJson(response, 200, aprendices[index]);
                return;
            }

            if (index === -1) {
                sendJson(response, 404, { error: "No se encontró el aprendiz." });
                return;
            }

            if (request.method === "PUT") {
                aprendices[index] = {
                    id: aprendizId,
                    ...validateAprendiz(await readBody(request))
                };
                validateCorreo(aprendices[index].correo);
                writeFileSync(dataFile, `${JSON.stringify(aprendices, null, 2)}\n`);
                sendJson(response, 200, aprendices[index]);
                return;
            }

            if (request.method === "PATCH") {
                aprendices[index] = {
                    ...aprendices[index],
                    ...validateCambiosAprendiz(await readBody(request))
                };
                validateCorreo(aprendices[index].correo);
                writeFileSync(dataFile, `${JSON.stringify(aprendices, null, 2)}\n`);
                sendJson(response, 200, aprendices[index]);
                return;
            }

            if (request.method === "DELETE") {
                aprendices.splice(index, 1);
                writeFileSync(dataFile, `${JSON.stringify(aprendices, null, 2)}\n`);
                response.writeHead(204);
                response.end();
                return;
            }
        }

        sendJson(response, 404, { error: "Ruta no encontrada." });
    } catch (error) {
        console.error(error);
        sendJson(response, error.status || 500, {
            error: error.status ? error.message : "Error al procesar la solicitud."
        });
    }
});

server.listen(port, "127.0.0.1", () => {
    console.log(`API local disponible en http://127.0.0.1:${port}`);
});
