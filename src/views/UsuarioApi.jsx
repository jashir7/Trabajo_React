import { useState, useEffect } from 'react';
function UsuarioApi() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="usuarios-api">
            <h2>Instructores</h2>
            <p>Estos instructores son obtenidos de la API de prueba JSONPlaceholder.</p>
            <div className="lista-usuarios">
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <h3>{usuario.name}</h3>
                        <h4>{usuario.email}</h4>
                        <p>{usuario.address.street}, {usuario.address.city}</p>
                    </li>
                ))}
            </div>
        </section>
    );
}

export default UsuarioApi;