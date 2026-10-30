import { useEffect, useState } from "react";
import { guardarPresentacion, obtenerPresentacion } from "../aprendices";

function PresentacionAprendiz() {
    const [nombre, setNombre] = useState("");
    const [curso, setCurso] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [mostrarInfo, setMostrarInfo] = useState(false);
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        obtenerPresentacion()
            .then(setPerfil)
            .catch((errorCarga) => {
                console.error(errorCarga);
                setError(errorCarga.message || "No se pudo cargar la presentación guardada.");
            })
            .finally(() => setCargando(false));
    }, []);

    async function manejarEnvio(evento) {
        evento.preventDefault();
        setMensaje("");
        setError("");
        if (nombre.trim() === "" || curso.trim() === "") {
            setError("Completa todos los campos obligatorios antes de continuar.");
            return;
        }

        const nuevosDatos = { nombre: nombre.trim(), curso: curso.trim() };

        setEnviando(true);
        try {
            const presentacion = await guardarPresentacion(nuevosDatos);
            setPerfil(presentacion);
            setMensaje("Presentación guardada correctamente.");
            setNombre("");
            setCurso("");
        } catch (errorGuardando) {
            console.error(errorGuardando);
            setError(errorGuardando.message || "No se pudo guardar la presentación.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div>
            <h2>Mi presentación</h2>

            <form onSubmit={manejarEnvio}>
                <label htmlFor="nombrePresentacion">Escribe tu nombre: </label>
                <input
                    id="nombrePresentacion"
                    type="text"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                    placeholder="Ejemplo: Jhon Carmona"
                    required
                />
                <br /><br />

                <label htmlFor="cursoPresentacion">¿Qué curso te interesa?</label>
                <input
                    id="cursoPresentacion"
                    type="text"
                    value={curso}
                    onChange={(evento) => setCurso(evento.target.value)}
                    placeholder="Ejemplo: Desarrollo web"
                    required
                />
                <br /><br />
                
                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : "Enviar formulario"}
                </button>
            </form>

            {mensaje && <p role="status">{mensaje}</p>}
            {error && <p role="alert">{error}</p>}

            <h3>MI PERFIL DE APRENDIZ</h3>

            {cargando && <p role="status">Cargando presentación...</p>}
            {mostrarInfo && perfil && (
                <div>
                    <p><strong>Nombre:</strong> {perfil.nombre}</p>
                    <p><strong>Curso de interés:</strong> {perfil.curso}</p>
                    <br />
                </div>
            )}
                <button
                    type="button"
                    onClick={() => setMostrarInfo(!mostrarInfo)}
                    disabled={cargando || !perfil}
                >
                    {mostrarInfo ? "Ocultar información" : "Mostrar información"}
                </button>
        </div>
    );
}

export default PresentacionAprendiz;
