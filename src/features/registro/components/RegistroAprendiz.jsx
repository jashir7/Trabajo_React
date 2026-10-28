import { useState } from "react";

function RegistroAprendiz() {
    const [nombre, setnombre] = useState("")

    function inscrito(event) {
        event.preventDefault();
        if (nombre.trim() === "") {
            alert(`Por favor, completa todos los campos`);
            return;
        }
        alert(`Hola ${nombre}, te has registrado correctamente`);
        setnombre("");
    }

    return (
        <div>
            <h2>Registro de aprendiz</h2>
            <label>escribe tu nombre</label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setnombre(e.target.value)}
                placeholder="Escribe tu nombre"
            />
            <p></p>
            <button onClick={inscrito}>registrarse</button>
        </div>
    );
}

export default RegistroAprendiz;

