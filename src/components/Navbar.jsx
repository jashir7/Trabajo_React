import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/Sena-app">SENA APP</NavLink>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/cursos">Cursos</NavLink></li>
        <li><NavLink to="/registro">Registro</NavLink></li>
        <li><NavLink to="/Usuarios">Usuarios</NavLink></li>
        <li><NavLink to="/Fichas">Fichas</NavLink></li>
        <li><NavLink to="/acerca-de">Acerca de</NavLink></li>

      </ul>
    </nav>
  );
}

export default Navbar;