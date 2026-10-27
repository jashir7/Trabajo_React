import { useEffect, useState } from "react";
import "./Fichas.css";

function Fichas() {
    const [Fichas, setFichas] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((respuesta) => respuesta.json())
            .then((datos) => { setFichas(datos); });
    }, []);

    return (
        <section className="fichas">
        <h2 className="fichas__titulo">Fichas de prueba</h2>
        <p className="fichas__descripcion">Esta informacion proviene de una api externa</p>
        <div className="lista-Fichas">
            {Fichas.map((Ficha) => (
                <article className="lista-Ficha" key={Ficha.id}>
                    <h3>{Ficha.title}</h3>
                    <p>{Ficha.body}</p>
                </article>

            ))}
               </div>
    </section>









        )

}

export default Fichas;