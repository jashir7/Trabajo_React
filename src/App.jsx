import './App.css';
import Curso from './components/Curso';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RegistroAprendiz from './components/Registro_aprendiz';
function App() {

  function saludar(){
    alert("Beinvenido al Centro Nacional Colombo Aleman")
  }
  return (
    <div>
      <Header />
      <Navbar />

      <main id="inicio">
        <h2>Bienvenidos a nuestro portal de formacion</h2>
        <button onClick={saludar}>haz click aqui</button>

        <section id="cursos">
          <h2>Nuestros cursos</h2>
          <p>Ofrecemos una variedad de cursos para ayudarte a desarrollar tus habilidades</p>

          <Curso
          nombre = "Desarrollo web"
          descripcion = "Aprende a crear paginas web modernas y atractivas" />
          <Curso
          nombre = "Bases de datos"
          descripcion = "Aprende a gestionar y manipular bases de datos"/>
          <Curso
          nombre = "Inteligencia artificial"
          descripcion = "Aprende a desarrollar soluciones basadas en intelifgencia artificial" />
          <Curso
          nombre = "Programacion con Java"
          descripcion = "Aprende a desarrollar soluciones basadas en Java" />
          <Curso
          nombre = "Curso de Python"
          descripcion = "Aprende a desarrollar soluciones basadas en Python" />

        </section>

        <section id="nosotros">
          <h2>Sobre nosotros</h2>
          <p>Somos un centro de formación comprometido con el desarrollo de nuestros estudiantes y la ecxelencia educativa</p>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>Puedes contactarnos a través de nuestro correo electrónico o un numero de telefono </p>
        </section>

      </main>

      <h2>Otros cursos</h2>
      <p>Explora más opciones de aprendizaje en nuestra plataforma.</p>

      <RegistroAprendiz/>
      <Footer />

    </div>
  );
}
export default App