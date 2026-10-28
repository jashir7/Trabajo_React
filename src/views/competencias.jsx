import { useState, useEffect } from "react";

function Competencias() {
    const [competencias, setcompetencias] = useState([]);
    const [cargando, setcargando] = useState(true);
    const [error, seterror] = useState("");

    useEffect(() => {
        async function obtenerusuarios() {
            try {
                setcargando(true);
                const respuesta = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );
                if (!respuesta.ok) {
                    throw new Error("No fue posible cargar usuarios");
                }
                
                const datos = await respuesta.json();
                setcompetencias(datos);
            } catch (error) {
                seterror("no pudimos cargar los usuarios, intenta nuevamente");
            } finally {
                setcargando(false);
            }
        }

        obtenerusuarios();
    }, []);

    if (cargando) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de competencias</h2>
            <div>
                {competencias.map((competencia) => (
                    <div key={competencia.id}>
                        <strong>{competencia.title}</strong>
                        <span>
                            Estado: {competencia.completed ? "Completado" : "No completado"}
                        </span>
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Competencias;
