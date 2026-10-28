import { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { cursosIniciales } from './data/cursos';
import { Navigate, Route, Routes } from 'react-router-dom';
import InicioPage from './pages/InicioPage';
import CursosPage from './features/cursos/CursosPage';
import RegistroPage from './features/registro/RegistroPage';
import AcercaDePage from './pages/AcercaDePage';
import InstructoresPage from './features/instructores/InstructoresPage';
import UsuariosPage from './features/usuarios/UsuariosPage';
import EvaluacionesPage from './features/evaluaciones/EvaluacionesPage';
import FichasPage from './features/fichas/FichasPage';
import AcademicoPage from './features/academico/AcademicoPage';
import CompetenciasPage from './features/competencias/CompetenciasPage';
import { usersIniciales } from './data/users';

function App() {
  const [cursos, setCursos] = useState(() => {
    const cursosGuardados = localStorage.getItem("misCursos");
    return cursosGuardados ? JSON.parse(cursosGuardados) : [...cursosIniciales];
  });
  const [registro, setRegistro] = useState(() => {
    try {
      const registroGuardados = localStorage.getItem("registroAprendiz");
      return registroGuardados ? JSON.parse(registroGuardados) : [...usersIniciales];
    } catch {
      return [...usersIniciales];
    }
  });
  useEffect(() => {
    localStorage.setItem("misCursos", JSON.stringify(cursos));
  }, [cursos]);
  useEffect(() => {
    localStorage.setItem("registroAprendiz", JSON.stringify(registro));
  }, [registro]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/cursos" element={<CursosPage cursos={cursos} setCursos={setCursos} />} />
          <Route path="/registro" element={<RegistroPage registro={registro} setRegistro={setRegistro} />} />
          <Route path="/Aprendices" element={<RegistroPage registro={registro} setRegistro={setRegistro} />} />
          <Route path="/acerca-de" element={<AcercaDePage />} />
          <Route path="/Instructores" element={<InstructoresPage />} />
          <Route path="/Evaluaciones" element={<EvaluacionesPage />} />
          <Route path="/Fichas" element={<FichasPage />} />
          <Route path="/academico" element={<AcademicoPage />} />
          <Route path="/competencias" element={<CompetenciasPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
