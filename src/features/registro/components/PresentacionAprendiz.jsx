import { useState } from "react";

function PresentacionAprendiz() {
    const [nombre, setNombre] = useState("");
    const [curso, setCurso] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mostrarInfo, setMostrarInfo] = useState(false);

    const [perfil, setPerfil] = useState(() => {
        const aprendizLocal = localStorage.getItem("aprendiz");
        return aprendizLocal
            ? JSON.parse(aprendizLocal)
            : { nombre: "", curso: "" };
    });

    function manejarEnvio(evento) {
        evento.preventDefault();
        if (nombre.trim() === "" || curso.trim() === "") {
            setMensaje("Completa todos los campos obligatorios antes de continuar");
            return;
        }

        const nuevosDatos = { nombre: nombre.trim(), curso: curso.trim() };

        setPerfil(nuevosDatos);
        localStorage.setItem("aprendiz", JSON.stringify(nuevosDatos));

        setMensaje("Presentación enviada correctamente.");
        setNombre("");
        setCurso("");
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
                />
                <br /><br />

                <label htmlFor="cursoPresentacion">¿Qué curso te interesa?</label>
                <input
                    id="cursoPresentacion"
                    type="text"
                    value={curso}
                    onChange={(evento) => setCurso(evento.target.value)}
                    placeholder="Ejemplo: Desarrollo web"
                />
                <br /><br />
                
                <button type="submit">Enviar formulario</button>
            </form>
            
            {mensaje !== "" && <p>{mensaje}</p>}

            <h3>MI PERFIL DE APRENDIZ</h3>

            {mostrarInfo && perfil.nombre && (
                <div>
                    <p><strong>Nombre:</strong> {perfil.nombre}</p>
                    <p><strong>Curso de interés:</strong> {perfil.curso}</p>
                    <br />
                </div>
            )}
                <button onClick={() => setMostrarInfo(!mostrarInfo)}>
                    {mostrarInfo ? "Ocultar información" : "Mostrar información"}
                </button>
        </div>
    );
}

export default PresentacionAprendiz;

