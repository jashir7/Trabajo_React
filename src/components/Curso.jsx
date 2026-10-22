import { useState } from 'react';
import { Tarjetas } from './Tarjetas.jsx';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    if (index < Tarjetas.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }


  let tarjeta = Tarjetas[index];

  return (
    <>
      <button onClick={handleClick}>
        Siguiente
      </button>
      <h2>
        <i>{tarjeta.nombre}</i> {}
      </h2>
      <h3>
        ({index + 1} de {Tarjetas.length})
      </h3>
      <img
        src={tarjeta.url}
        alt={tarjeta.nombre}
      />
      <p>
        {tarjeta.descripcion} {}
      </p>
    </>
  );
}