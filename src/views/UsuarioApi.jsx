import React, { useEffect, useState } from 'react';

function UsuarioApi() { 
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function obtenerUsuarios() {
            try {
                setCargando(true);
                const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!respuesta.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await respuesta.json();
                setUsuarios(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }

        obtenerUsuarios();
    }, []);

    if (cargando) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Usuarios</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <div key={usuario.id}>
                        <strong>{usuario.name}</strong> - {usuario.email}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default UsuarioApi;