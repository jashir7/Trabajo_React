
import { NavLink } from 'react-router-dom';

export default function Academico() {
  return (
    
    <div>
        <h1>Indice de Contenidos</h1>
        <ul>
        
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/fichas">Fichas</NavLink></li>
        <li><NavLink to="/evaluaciones">Evaluaciones</NavLink></li>
        <li><NavLink to="/usuarios-api">Usuarios API</NavLink></li>
        <li><NavLink to="/competencias">Tareas de demostracion</NavLink></li>



          
        </ul>
    </div>
  );
}
