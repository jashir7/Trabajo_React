import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Tarjetas } from './components/Tarjetas';
import { Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './views/Inicio';
import Cursos from './views/Curso';
import Registro from './views/Registro';
import AcercaDe from './views/AcercaDe';
import UsuarioApi from './views/UsuarioApi';
import Evaluaciones from './views/Evaluaciones';
import Fichas from './views/Fichas'
import Academico from './views/SenaApp';
import Competencias from './views/competencias';

function App() {
  const [cursos, setCursos] = useState(() => {
    const cursosGuardados = localStorage.getItem("misCursos");
    return cursosGuardados ? JSON.parse(cursosGuardados) : [...Tarjetas];
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
          <Route path="/" element={<Inicio />} />
          <Route path="/cursos" element={<Cursos cursos={cursos} setCursos={setCursos} />}/>
          <Route path="/registro" element={<Registro />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/UsuarioApi" element={<UsuarioApi />} />
          <Route path="/Evaluaciones" element={<Evaluaciones />} />
          <Route path="/Fichas" element={<Fichas />} />
          <Route path="/academico" element={<Academico />} />
          <Route path="/competencias" element={<Competencias />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;