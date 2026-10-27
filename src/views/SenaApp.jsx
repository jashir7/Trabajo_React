import { NavLink } from 'react-router-dom';

function SenaApp() {
  return (
    
    <div>
        <h2>Aguacate</h2>
        <ul>
        
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/Fichas">Fichas</NavLink></li>


          
        </ul>
    </div>
  );
}

export default SenaApp;