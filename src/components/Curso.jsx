import { useState } from 'react';
import GestorCurso from "./GestorCurso"; 

export default function Cursos({ cursos, setCursos }) {
  const [index, setIndex] = useState(0);


  function handleClick() {
    if (index < cursos.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  if (cursos.length === 0) {
    return (
      <>
        <h2>No hay cursos registrados.</h2>
        {}
        <GestorCurso cursos={cursos} setCursos={setCursos} />
      </>
    );
  }

  
  let tarjeta = cursos[index];

  return (
    <>
      <button onClick={handleClick}>
        Siguiente
      </button>
      <h2>
        <i>{tarjeta.nombre}</i>
      </h2>
      <h3>
        ({index + 1} de {cursos.length})
      </h3>
      <img
        src={tarjeta.url}
        alt={tarjeta.nombre}
      />
      <p>
        {tarjeta.descripcion}
      </p>

      <hr /> {}

      {}
      <GestorCurso cursos={cursos} setCursos={setCursos} />
    </>
  );
}