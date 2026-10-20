import {useState} from 'react';
function Curso(props) {
  const [interesados, setInteresados] = useState(0);
  const [inscritos, setInscritos] = useState(0);
  function agregarInteresado() {
    setInteresados(interesados + 1);
  }
  function Mostrar_descripcion(){
    alert(`¡Bienvenido al curso de ${props.nombre}!`);
  }
  function Inscribirme(){
    alert(`¡Felicidades, se ha inscrito!`);
    setInscritos(inscritos + 1);
  }
  return (
    <div>
      <h2>{props.nombre}</h2>
      <p>{props.descripcion}.</p>
      <button onClick={Mostrar_descripcion}> Ver mas</button>
      <p>   </p>
      <button onClick={Inscribirme}> Inscribase</button>
      <p></p>
      <button onClick={agregarInteresado}>Me interesa</button>
      <p>Interesados: {interesados}</p>
      <p>Inscritos: {inscritos}</p>
    </div>
  );
}
export default Curso;