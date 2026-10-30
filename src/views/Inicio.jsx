import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="inicio">
      <section className="inicio-hero" id="inicio">
        <div className="inicio-hero__contenido">
          <span className="inicio-hero__eyebrow">Centro Nacional Colombo Alemán</span>
          <h2>Impulsa lo que viene.</h2>
          <p>Formación técnica para quienes quieren llevar sus ideas más lejos.</p>
          <div className="inicio-hero__acciones">
            <Link to="/cursos">Explorar programas</Link>
            <Link to="/registro">Conocer el proceso</Link>
          </div>
        </div>
      </section>

      <section className="inicio-paneles" aria-label="Nuestra formación">
        <article className="inicio-panel">
          <span>01 / APRENDE</span>
          <h3>Conocimiento que avanza</h3>
          <p>Desarrolla habilidades para los retos de hoy y las oportunidades de mañana.</p>
        </article>
        <article className="inicio-panel">
          <span>02 / EXPLORA</span>
          <h3>Encuentra tu camino</h3>
          <p>Descubre programas en tecnología, innovación y desarrollo profesional.</p>
        </article>
        <article className="inicio-panel">
          <span>03 / CRECE</span>
          <h3>Convierte ideas en acción</h3>
          <p>Da el siguiente paso con una comunidad que impulsa tu talento.</p>
        </article>
      </section>

      <section className="inicio-destacado" id="nosotros">
        <div>
          <span className="seccion-etiqueta">Tu próximo capítulo</span>
          <h2>El futuro se construye aprendiendo.</h2>
          <p>Conoce nuestros cursos y encuentra la formación que acompaña tu próxima meta.</p>
        </div>
        <Link to="/cursos">Ver todos los cursos</Link>
      </section>
    </div>
  );
}

export default Inicio;