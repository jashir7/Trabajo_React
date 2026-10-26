import PresentacionAprendiz from "../components/Presentacion_aprendiz";
import RegistroAprendiz from "../components/Registro_aprendiz";

function Registro() {
  return (
    <section id="registro">
      <h2>Registro de aprendiz</h2>
      <p>Regístrate y cuéntanos qué curso te interesa.</p>
      <RegistroAprendiz />
      <PresentacionAprendiz />
    </section>
  );
}

export default Registro;