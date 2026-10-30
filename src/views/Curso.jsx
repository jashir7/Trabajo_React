import GestorCurso from "../components/GestorCurso";

function Cursos({ cursos, cargando, error, onCrearCurso, onGuardarCurso, onEliminarCurso }) {
  return (
    <section id="cursos">
      <h2>Nuestros cursos</h2>
      <p>
        Explora los cursos disponibles y descubre opciones para desarrollar tus
        habilidades.
      </p>
      {cargando ? (
        <p role="status">Cargando cursos...</p>
      ) : error ? (
        <p role="alert">Error: {error}</p>
      ) : (
        <GestorCurso
          cursos={cursos}
          onCrearCurso={onCrearCurso}
          onGuardarCurso={onGuardarCurso}
          onEliminarCurso={onEliminarCurso}
        />
      )}
    </section>
  );
}

export default Cursos;