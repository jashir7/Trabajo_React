import { useEffect, useState } from "react";
import "./Fichas.css";

function Fichas() {
    const [fichas, setFichas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function cargarFichas() {
            try {
                const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    signal: controller.signal
                });
                if (!respuesta.ok) {
                    throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
                }

                const datos = await respuesta.json();
                if (!Array.isArray(datos)) {
                    throw new Error("La respuesta recibida no tiene el formato esperado.");
                }
                setFichas(datos);
            } catch (errorCarga) {
                if (errorCarga.name !== "AbortError") {
                    console.error(errorCarga);
                    setError(errorCarga.message || "No se pudieron cargar las fichas.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        cargarFichas();
        return () => controller.abort();
    }, []);

    return (
        <section className="fichas">
            <h2 className="fichas__titulo">Fichas de prueba</h2>
            <p className="fichas__descripcion">Esta información de demostración proviene de una API externa.</p>
            {cargando && <p role="status">Cargando fichas...</p>}
            {error && <p role="alert">Error: {error}</p>}
            {!cargando && !error && fichas.length === 0 && <p>No hay fichas disponibles.</p>}
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

export default Fichas;