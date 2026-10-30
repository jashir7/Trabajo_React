import { useState } from "react";
import { registrarAprendiz } from "../aprendices";

function Registro_aprendiz() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    async function inscribir(evento) {
        evento.preventDefault();
        setMensaje("");
        setError("");

        if (nombre.trim() === "") {
            setError("Por favor, escribe el nombre del aprendiz.");
            return;
        }

        try {
            await registrarAprendiz({ nombre: nombre.trim(), correo: "" });
            setMensaje(`Hola ${nombre.trim()}, te has registrado correctamente.`);
            setNombre("");
        } catch (registroError) {
            console.error(registroError);
            setError(registroError.message || "No se pudo guardar el registro. Inténtalo de nuevo.");
        }
    }

    return (
        <div>
            <h2>Registro de aprendiz</h2>
            <form onSubmit={inscribir}>
                <label htmlFor="nombreAprendiz">Escribe tu nombre</label>
                <input
                    id="nombreAprendiz"
                    type="text"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                    placeholder="Escribe tu nombre"
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
            {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Registro_aprendiz;