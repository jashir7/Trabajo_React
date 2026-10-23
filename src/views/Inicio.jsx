import { Link } from "react-router-dom";

function Inicio() {
  return (
    <>
      <section className="inicio" id="inicio">
        <h2>Bienvenidos a nuestro portal de formación</h2>
        <p>Encuentra cursos y fortalece tus habilidades tecnológicas.</p>
        <p>
          <Link to="/cursos">Explorar cursos</Link>
          {" | "}
          <Link to="/registro">Registrarme como aprendiz</Link>
        </p>
      </section>

      <section id="nosotros">
        <h2>Sobre nosotros</h2>
        <p>
          Somos un centro de formación comprometido con el desarrollo de
          nuestros estudiantes y la excelencia educativa.
        </p>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p>
          Puedes conocer nuestros cursos y registrarte como aprendiz desde
          este portal.
        </p>
      </section>
    </>
  );
}

export default Inicio;