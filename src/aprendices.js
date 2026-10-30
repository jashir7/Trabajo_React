async function solicitarApi(url, options) {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        }
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "No se pudo completar la solicitud.");
    }

    if (response.status === 204) {
        return null;
    }
    return response.json();
}

let migracionPendiente;
let migracionCursosPendiente;
let migracionPresentacionPendiente;

function migrarAprendicesLocales() {
    if (!migracionPendiente) {
        migracionPendiente = (async () => {
            const guardados = localStorage.getItem("aprendices");
            if (!guardados) {
                return;
            }

            const aprendices = JSON.parse(guardados);
            if (!Array.isArray(aprendices)) {
                throw new Error("Los datos locales de aprendices no tienen un formato válido.");
            }

            await Promise.all(aprendices.map((aprendiz) =>
                solicitarApi("/api/aprendices", {
                    method: "POST",
                    body: JSON.stringify(aprendiz)
                })
            ));
            localStorage.removeItem("aprendices");
        })().catch((error) => {
            migracionPendiente = undefined;
            throw error;
        });
    }

    return migracionPendiente;
}

export function obtenerAprendices() {
    return migrarAprendicesLocales().then(() => solicitarApi("/api/aprendices"));
}

export function obtenerAprendiz(id) {
    return migrarAprendicesLocales()
        .then(() => solicitarApi(`/api/aprendices/${encodeURIComponent(id)}`));
}

export function registrarAprendiz(datos) {
    return migrarAprendicesLocales()
        .then(() => solicitarApi("/api/aprendices", {
            method: "POST",
            body: JSON.stringify(datos)
        }));
}

export function actualizarAprendiz(id, datos) {
    return migrarAprendicesLocales()
        .then(() => solicitarApi(`/api/aprendices/${encodeURIComponent(id)}`, {
            method: "PUT",
            body: JSON.stringify(datos)
        }));
}

export function modificarAprendiz(id, datos) {
    return migrarAprendicesLocales()
        .then(() => solicitarApi(`/api/aprendices/${encodeURIComponent(id)}`, {
            method: "PATCH",
            body: JSON.stringify(datos)
        }));
}

export function eliminarAprendiz(id) {
    return migrarAprendicesLocales()
        .then(() => solicitarApi(`/api/aprendices/${encodeURIComponent(id)}`, {
            method: "DELETE"
        }));
}

function migrarCursosLocales() {
    if (!migracionCursosPendiente) {
        migracionCursosPendiente = (async () => {
            const guardados = localStorage.getItem("misCursos");
            if (!guardados) {
                return;
            }

            const cursos = JSON.parse(guardados);
            if (!Array.isArray(cursos)) {
                throw new Error("Los cursos guardados localmente no tienen un formato válido.");
            }

            await Promise.all(cursos.map((curso) =>
                solicitarApi("/api/cursos", {
                    method: "POST",
                    body: JSON.stringify(curso)
                })
            ));
            localStorage.removeItem("misCursos");
        })().catch((error) => {
            migracionCursosPendiente = undefined;
            throw error;
        });
    }

    return migracionCursosPendiente;
}

function migrarPresentacionLocal() {
    if (!migracionPresentacionPendiente) {
        migracionPresentacionPendiente = (async () => {
            const guardada = localStorage.getItem("aprendiz");
            if (!guardada) {
                return;
            }

            const presentacion = JSON.parse(guardada);
            if (!presentacion || typeof presentacion !== "object") {
                throw new Error("La presentación guardada localmente no tiene un formato válido.");
            }

            await solicitarApi("/api/presentacion", {
                method: "PUT",
                body: JSON.stringify(presentacion)
            });
            localStorage.removeItem("aprendiz");
        })().catch((error) => {
            migracionPresentacionPendiente = undefined;
            throw error;
        });
    }

    return migracionPresentacionPendiente;
}

export function obtenerCursos() {
    return migrarCursosLocales().then(() => solicitarApi("/api/cursos"));
}

export function registrarCurso(datos) {
    return solicitarApi("/api/cursos", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}

export function actualizarCurso(id, datos) {
    return solicitarApi(`/api/cursos/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(datos)
    });
}

export function eliminarCurso(id) {
    return solicitarApi(`/api/cursos/${encodeURIComponent(id)}`, {
        method: "DELETE"
    });
}

export function obtenerPresentacion() {
    return migrarPresentacionLocal()
        .then(() => solicitarApi("/api/presentacion"));
}

export function guardarPresentacion(datos) {
    return migrarPresentacionLocal()
        .then(() => solicitarApi("/api/presentacion", {
            method: "PUT",
            body: JSON.stringify(datos)
        }));
}
