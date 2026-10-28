import { useState } from "react";

function RegistroAprendiz({ registro = [], setRegistro }) {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");

    function inscrito(event) {
        event.preventDefault();
        if (nombre.trim() === "") {
            setMensaje("Por favor, completa todos los campos.");
            return;
        }

        const nuevoUsuario = {
            id: Date.now().toString(),
            nombre: nombre.trim(),
        };

        if (setRegistro) {
            setRegistro([...registro, nuevoUsuario]);
        }
        setMensaje(`¡Hola ${nombre}, te has registrado correctamente!`);
        setNombre("");
    }

    return (
        <div>
            <h2>Registro de aprendiz</h2>
            <form onSubmit={inscrito}>
                <label htmlFor="nombre-registro">Escribe tu nombre</label>
                <input
                    id="nombre-registro"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                />
                <p></p>
                <button type="submit">Registrarse</button>
            </form>

            {mensaje && <p role="status">{mensaje}</p>}

            <h3>Aprendices registrados: {registro.length}</h3>
            <ul>
                {registro.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.nombre}
                        <button
                            type="button"
                            onClick={() =>
                                setRegistro(registro.filter((u) => u.id !== usuario.id))
                            }
                            style={{ marginLeft: "10px" }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RegistroAprendiz;
