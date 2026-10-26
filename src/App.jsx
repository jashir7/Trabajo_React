import { useState } from 'react';
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
function App() {
  const [cursos, setCursos] = useState(() => [...Tarjetas]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/cursos"
            element={<Cursos cursos={cursos} setCursos={setCursos} />}
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;