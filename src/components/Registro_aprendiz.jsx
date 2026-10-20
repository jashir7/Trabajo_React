import { useState } from "react";

function RegistroAprendiz() {
  const [nombre, setNombre] = useState("");

return (
    <div>


      <h2>Registro de Aprendiz</h2>


      <label>Escribe tu nombre:</label>


      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
      />

      <p>Bienvenido, {nombre}!</p>

    </div>
  );
}

export default RegistroAprendiz;