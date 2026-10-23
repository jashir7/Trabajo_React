import './App.css';
import Curso from './components/Curso';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RegistroAprendiz from './components/Registro_aprendiz';
import PresentacionAprendiz from './components/Presentacion_aprendiz';
import Ejemploeffect from './components/Ejemploeffect';
function App() {

  function saludar(){
    alert("Beinvenido al Centro Nacional Colombo Aleman")
  }
  return (
    <div>
      <Header />
      <Navbar />
      <Ejemploeffect/>

      <main id="inicio">
        <h2>Bienvenidos a nuestro portal de formacion</h2>
        <button onClick={saludar}>haz click aqui</button>

        <section id="cursos">
          <h2>Nuestros cursos</h2>
          <p>Ofrecemos una variedad de cursos para ayudarte a desarrollar tus habilidades</p>

          <Curso />

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
      <PresentacionAprendiz/>
      <Footer />

    </div>
  );
}
export default App