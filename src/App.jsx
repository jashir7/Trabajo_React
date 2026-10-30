import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './views/Inicio';
import Cursos from './views/Curso';
import Registro from './views/Registro';
import AcercaDe from './views/AcercaDe';
import Instructores from './views/Instructores';
import UsuarioApi from './views/Usuarios';
import Evaluaciones from './views/Evaluaciones';
import Fichas from './views/Fichas'
import Academico from './views/SenaApp';
import Competencias from './views/Competencias';
import RegistroAprendizAPI from './views/RegistroAprendizAPI';
import Metodos from './views/MetodosHttp';
import ActualizarAprendiz from './views/ActualizarAprendiz';
import {
  actualizarCurso,
  eliminarCurso,
  obtenerCursos,
  registrarCurso,
} from './aprendices';

function App() {
  const [cursos, setCursos] = useState([]);
  const [cargandoCursos, setCargandoCursos] = useState(true);
  const [errorCursos, setErrorCursos] = useState("");

  useEffect(() => {
    obtenerCursos()
      .then(setCursos)
      .catch((error) => {
        console.error(error);
        setErrorCursos(error.message || "No se pudieron cargar los cursos.");
      })
      .finally(() => setCargandoCursos(false));
  }, []);

  async function crearCurso(datos) {
    const curso = await registrarCurso(datos);
    setCursos((actuales) => [...actuales, curso]);
  }

  async function guardarCurso(id, datos) {
    const curso = await actualizarCurso(id, datos);
    setCursos((actuales) =>
      actuales.map((actual) => actual.id === curso.id ? curso : actual)
    );
  }

  async function quitarCurso(id) {
    await eliminarCurso(id);
    setCursos((actuales) => actuales.filter((curso) => curso.id !== id));
  }

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/cursos"
            element={
              <Cursos
                cursos={cursos}
                cargando={cargandoCursos}
                error={errorCursos}
                onCrearCurso={crearCurso}
                onGuardarCurso={guardarCurso}
                onEliminarCurso={quitarCurso}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/Instructores" element={<Instructores />} />
          <Route path="/Evaluaciones" element={<Evaluaciones />} />
          <Route path="/Fichas" element={<Fichas />} />
          <Route path="/academico" element={<Academico />} />
          <Route path="/competencias" element={<Competencias />} />
          <Route path="/usuarios" element={<UsuarioApi />} />
          <Route path="/RegistroAprendizAPI" element={<RegistroAprendizAPI />} />
          <Route path="/ActualizarAprendiz" element={<ActualizarAprendiz />} />
          <Route path="/MetodosHttp" element={<Metodos />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;