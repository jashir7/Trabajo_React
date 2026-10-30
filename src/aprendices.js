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
