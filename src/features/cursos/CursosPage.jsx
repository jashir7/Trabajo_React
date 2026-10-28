import GestorCurso from "./components/GestorCurso";

function CursosPage({ cursos, setCursos }) {
  return (
    <section id="cursos">
      <h2>Nuestros cursos</h2>
      <p>
        Explora los cursos disponibles y descubre opciones para desarrollar tus
        habilidades.
      </p>
      <GestorCurso cursos={cursos} setCursos={setCursos} />
    </section>
  );
}

export default CursosPage;

