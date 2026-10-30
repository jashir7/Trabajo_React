
import { NavLink } from 'react-router-dom';

export default function Metodos() {
  return (
    <div className="metodos-http">
      <h1>Métodos HTTP para aprendices</h1>
      <p>La API guarda los cambios en el archivo <code>data/aprendices.json</code>.</p>
      <ul>
        <li><strong>GET:</strong> consultar la lista y los datos de un aprendiz.</li>
        <li><strong>POST:</strong> registrar un aprendiz nuevo.</li>
        <li><strong>PUT:</strong> reemplazar todos los datos editables de un aprendiz.</li>
        <li><strong>PATCH:</strong> modificar parcialmente los datos de un aprendiz.</li>
        <li><strong>DELETE:</strong> eliminar un aprendiz.</li>
      </ul>
      <p><NavLink to="/RegistroAprendizAPI">Probar POST: registrar aprendiz</NavLink></p>
      <p><NavLink to="/ActualizarAprendiz">Probar GET, PUT, PATCH y DELETE: gestionar aprendices</NavLink></p>
    </div>
  );
}
