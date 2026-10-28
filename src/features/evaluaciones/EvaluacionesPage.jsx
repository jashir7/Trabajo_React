import { useState, useEffect } from 'react';

function EvaluacionesPage() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvaluaciones = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/comments');
                if (!response.ok) {
                    throw new Error('Error al obtener las evaluaciones');
                }
                const data = await response.json();
                setEvaluaciones(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEvaluaciones();
    }, []);

    if (loading) {
        return <p>Cargando evaluaciones...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="evaluaciones-api">
            <h2>Evaluaciones</h2>
            <p>Estas son las evaluaciones de los usuarios.</p>
            <div className="lista-evaluaciones">
                {evaluaciones.map((evaluacion) => (
                    <li key={evaluacion.id}>
                        <h3>{evaluacion.name}</h3>
                        <h4>{evaluacion.email}</h4>
                        <p>{evaluacion.comment}</p>
                    </li>
                ))}
            </div>
        </section>
    );
}

export default EvaluacionesPage;

