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

function App() {
  const [cursos, setCursos] = useState(() => {
    const cursosGuardados = localStorage.getItem("misCursos");
    return cursosGuardados ? JSON.parse(cursosGuardados) : [...cursosIniciales];
  });
  useEffect(() => {
    localStorage.setItem("misCursos", JSON.stringify(cursos));
  }, [cursos]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/cursos" element={<CursosPage cursos={cursos} setCursos={setCursos} />}/>
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/acerca-de" element={<AcercaDePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/Instructores" element={<InstructoresPage />} />
          <Route path="/Evaluaciones" element={<EvaluacionesPage />} />
          <Route path="/Fichas" element={<FichasPage />} />
          <Route path="/academico" element={<AcademicoPage />} />
          <Route path="/competencias" element={<CompetenciasPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
