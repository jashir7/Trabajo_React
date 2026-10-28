import { useEffect, useState } from "react";
import "./Fichas.css";

function FichasPage() {
    const [fichas, setFichas] = useState([]);

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
                {fichas.map((ficha) => (
                    <article className="lista-Ficha" key={ficha.id}>
                        <h3>{ficha.title}</h3>
                        <p>{ficha.body}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default FichasPage;

