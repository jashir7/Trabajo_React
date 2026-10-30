
import { NavLink } from 'react-router-dom';

export default function Academico() {
  return (
    
    <div className="academico">
        <h1>Indice de Contenidos</h1>
        <ul>
        
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/Fichas">Fichas</NavLink></li>
        <li><NavLink to="/Evaluaciones">Evaluaciones</NavLink></li>
        <li><NavLink to="/UsuarioApi">Usuarios API</NavLink></li>
        <li><NavLink to="/competencias">Competencias</NavLink></li>
        <li><NavLink to="/Instructores">Instructores</NavLink></li>


          
        </ul>
    </div>
  );
}