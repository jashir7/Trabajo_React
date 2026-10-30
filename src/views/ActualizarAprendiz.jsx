import { useEffect, useState } from "react";
import {
    actualizarAprendiz as guardarCambios,
    eliminarAprendiz,
    modificarAprendiz,
    obtenerAprendices
} from "../aprendices";

function ActualizarAprendiz() {
    const [aprendices, setAprendices] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [aprendizId, setAprendizId] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [datosOriginales, setDatosOriginales] = useState({ nombre: "", correo: "" });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [procesando, setProcesando] = useState(false);

    useEffect(() => {
        obtenerAprendices()
            .then(setAprendices)
            .catch((requestError) => {
                console.error(requestError);
                setError(requestError.message || "No se pudieron cargar los aprendices guardados.");
            })
            .finally(() => setCargando(false));
    }, []);

    function seleccionarAprendiz(evento) {
        const id = evento.target.value;
        const seleccionado = aprendices.find((aprendiz) => aprendiz.id === id);

        setAprendizId(id);
        setNombre(seleccionado?.nombre ?? "");
        setCorreo(seleccionado?.correo ?? "");
        setDatosOriginales({
            nombre: seleccionado?.nombre ?? "",
            correo: seleccionado?.correo ?? ""
        });
        setMensaje("");
        setError("");
    }

    async function actualizarDatos(evento, metodo = "PUT") {
        evento.preventDefault();
        setMensaje("");
        setError("");
        setProcesando(true);

        try {
            const datosCompletos = {
                nombre: nombre.trim(),
                correo: correo.trim()
            };
            const datos = metodo === "PATCH"
                ? Object.fromEntries(
                    Object.entries(datosCompletos).filter(([campo, valor]) =>
                        valor !== datosOriginales[campo]
                    )
                )
                : datosCompletos;

            if (metodo === "PATCH" && Object.keys(datos).length === 0) {
                setMensaje("No hay cambios para enviar. Edita el nombre o el correo antes de usar PATCH.");
                return;
            }

            const actualizado = metodo === "PATCH"
                ? await modificarAprendiz(aprendizId, datos)
                : await guardarCambios(aprendizId, datosCompletos);
            setAprendices((actuales) =>
                actuales.map((aprendiz) => aprendiz.id === actualizado.id ? actualizado : aprendiz)
            );
            setDatosOriginales({ nombre: actualizado.nombre, correo: actualizado.correo });
            setMensaje(metodo === "PATCH"
                ? "Los campos se modificaron correctamente (PATCH)."
                : "Los datos se reemplazaron correctamente (PUT).");
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.message || "No se pudieron actualizar los datos.");
        } finally {
            setProcesando(false);
        }
    }

    async function borrarAprendiz() {
        if (!aprendizId || !window.confirm("¿Seguro que deseas eliminar este aprendiz?")) {
            return;
        }

        setMensaje("");
        setError("");
        setProcesando(true);
        try {
            await eliminarAprendiz(aprendizId);
            setAprendices((actuales) => actuales.filter((aprendiz) => aprendiz.id !== aprendizId));
            setAprendizId("");
            setNombre("");
            setCorreo("");
            setDatosOriginales({ nombre: "", correo: "" });
            setMensaje("El aprendiz se eliminó correctamente (DELETE).");
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.message || "No se pudo eliminar el aprendiz.");
        } finally {
            setProcesando(false);
        }
    }

    return (
        <div className="App">
            <h1>Actualizar aprendiz</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {cargando ? (
                <p>Cargando aprendices...</p>
            ) : aprendices.length === 0 ? (
                <p>No hay aprendices registrados para actualizar.</p>
            ) : (
                <form onSubmit={actualizarDatos}>
                    <label htmlFor="aprendizSeleccionado">Selecciona un aprendiz</label>
                    <select
                        id="aprendizSeleccionado"
                        value={aprendizId}
                        onChange={seleccionarAprendiz}
                        required
                    >
                        <option value="" disabled>Elige un aprendiz</option>
                        {aprendices.map((aprendiz) => (
                            <option key={aprendiz.id} value={aprendiz.id}>
                                {aprendiz.nombre}{aprendiz.correo ? ` - ${aprendiz.correo}` : ""}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="nombreActualizado">Nombre completo</label>
                    <input
                        id="nombreActualizado"
                        type="text"
                        value={nombre}
                        onChange={(evento) => setNombre(evento.target.value)}
                        required
                    />

                    <label htmlFor="correoActualizado">Correo electrónico</label>
                    <input
                        id="correoActualizado"
                        type="email"
                        value={correo}
                        onChange={(evento) => setCorreo(evento.target.value)}
                    />

                    <button type="submit" disabled={!aprendizId || procesando}>
                        Guardar todos los campos (PUT)
                    </button>
                    <button
                        type="button"
                        disabled={!aprendizId || procesando}
                        onClick={(evento) => actualizarDatos(evento, "PATCH")}
                    >
                        Modificar campos (PATCH)
                    </button>
                    <button type="button" disabled={!aprendizId || procesando} onClick={borrarAprendiz}>
                        Eliminar aprendiz (DELETE)
                    </button>
                </form>
            )}
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default ActualizarAprendiz;