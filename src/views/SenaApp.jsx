import { NavLink } from 'react-router-dom';

export default function Academico() {
  return (
    
    <div>
        <h1>Indice de Contenidos</h1>
        <ul>
        
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/Fichas">Fichas</NavLink></li>
        <li><NavLink to="/Evaluaciones">Evaluaciones</NavLink></li>
        <li><NavLink to="/UsuarioApi">Usuarios API</NavLink></li>


          
        </ul>
    </div>
  );
}

