import { useEffect, useState } from "react";

function TareasDemostracion() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function obtenerTareas() {
            setCargando(true);
            setError("");

            try {
                const respuesta = await fetch(
                    "https://jsonplaceholder.typicode.com/todos",
                    { signal: controller.signal }
                );

                if (!respuesta.ok) {
                    throw new Error(`El servidor respondio con el estado ${respuesta.status}.`);
                }

                const datos = await respuesta.json();

                if (!Array.isArray(datos) || !datos.every((tarea) =>
                    tarea &&
                    typeof tarea.id === "number" &&
                    typeof tarea.title === "string" &&
                    typeof tarea.completed === "boolean"
                )) {
                    throw new Error("La respuesta recibida no tiene el formato esperado.");
                }

                setTareas(datos);
            } catch (errorObteniendoTareas) {
                const solicitudCancelada =
                    errorObteniendoTareas instanceof Error &&
                    errorObteniendoTareas.name === "AbortError";

                if (!solicitudCancelada) {
                    const detalle = errorObteniendoTareas instanceof Error
                        ? errorObteniendoTareas.message
                        : "Ocurrio un error inesperado.";
                    setError(`No se pudieron cargar las tareas. ${detalle}`);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        obtenerTareas();

        return () => controller.abort();
    }, [intento]);

    if (cargando) return <p role="status">Cargando tareas de demostracion...</p>;
    if (error) {
        return (
            <section aria-labelledby="tareas-titulo">
                <h2 id="tareas-titulo">Tareas de demostracion</h2>
                <p role="alert">{error}</p>
                <button type="button" onClick={() => setIntento((actual) => actual + 1)}>
                    Reintentar
                </button>
            </section>
        );
    }

    return (
        <section aria-labelledby="tareas-titulo">
            <h2 id="tareas-titulo">Tareas de demostracion</h2>
            <p>Datos de prueba obtenidos de JSONPlaceholder; no son competencias reales.</p>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <strong>{tarea.title}</strong>
                        <span> Estado: {tarea.completed ? "Completada" : "Pendiente"}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default TareasDemostracion;
