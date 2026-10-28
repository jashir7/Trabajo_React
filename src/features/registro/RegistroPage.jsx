import PresentacionAprendiz from "./components/PresentacionAprendiz";
import RegistroAprendiz from "./components/RegistroAprendiz";

function RegistroPage() {
  return (
    <section id="registro">
      <h2>Registro de aprendiz</h2>
      <p>Regístrate y cuéntanos qué curso te interesa.</p>
      <RegistroAprendiz />
      <PresentacionAprendiz />
    </section>
  );
}

export default RegistroPage;

