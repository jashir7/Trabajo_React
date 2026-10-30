import { useState } from "react";
import { registrarAprendiz as guardarAprendiz } from "../aprendices";

function RegistroAprendizAPI() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviado, setEnviado] = useState(false);

    async function registrarAprendiz(evento) {
        evento.preventDefault();
        setMensaje("");
        setEnviado(true);

        try {
            await guardarAprendiz({ nombre: nombre.trim(), correo: correo.trim() });
            setMensaje("Aprendiz registrado correctamente y disponible para actualizar.");
            setNombre("");
            setCorreo("");
        } catch (error) {
            console.error(error);
            setMensaje(error.message || "No se pudo completar el registro. Inténtalo de nuevo.");
        } finally {
            setEnviado(false);
        }
    }

    return (
        <section>
            <h2>Registrar Aprendiz</h2>

            <form onSubmit={registrarAprendiz}>
                <div>
                    <label htmlFor="nombreAprendizApi">Nombre completo</label>
                    <input 
                        id="nombreAprendizApi"
                        type="text"
                        value={nombre}
                        onChange={(evento) => setNombre(evento.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="correoAprendizApi">Correo electrónico</label>
                    <input 
                        id="correoAprendizApi"
                        type="email"
                        value={correo} 
                        onChange={(evento) => setCorreo(evento.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" disabled={enviado}>
                    {enviado ? "Enviando..." : "Registrar"}
                </button>
            </form>
            
            {mensaje && <p>{mensaje}</p>}
        </section>
    );
}

export default RegistroAprendizAPI;