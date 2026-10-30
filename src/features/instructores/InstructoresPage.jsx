import { useState, useEffect } from 'react';

function InstructoresPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [instructorEditando, setInstructorEditando] = useState(null);
    const [mensaje, setMensaje] = useState('');

    // REEMPLAZA ESTA URL CON TU URL REAL DE MOCKAPI
    const API_URL = 'https://6ae4a01528393034b08dc7a2.mockapi.io/Instructores'; 

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Error al obtener los instructores');
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

    const manejarActualizacion = (e) => {
        e.preventDefault();
        setMensaje('Actualizando...');

        fetch(`${API_URL}/${instructorEditando.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // Enviamos el objeto plano, tal cual lo configuraste en MockAPI
            body: JSON.stringify(instructorEditando),
        })
            .then((respuesta) => {
                if (!respuesta.ok) throw new Error('Error al actualizar');
                return respuesta.json();
            })
            .then((datosActualizados) => {
                const nuevaLista = usuarios.map((usuario) =>
                    usuario.id === instructorEditando.id ? datosActualizados : usuario
                );
                setUsuarios(nuevaLista);
                
                setMensaje(`¡Instructor actualizado con éxito!`);
                setInstructorEditando(null); 
                setTimeout(() => setMensaje(''), 3000);
            })
            .catch((error) => {
                setMensaje('Error al actualizar el instructor.');
                console.error(error);
            });
    };

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        // Ahora el manejo de inputs es mucho más simple porque no hay objetos anidados
        setInstructorEditando({
            ...instructorEditando,
            [name]: value
        });
    };

    if (loading) return <p>Cargando instructores...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="usuarios-api">
            <h2>Instructores</h2>
            <p>Estos instructores son obtenidos de MockAPI.</p>

            {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}

            {instructorEditando && (
                <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #007bff', borderRadius: '8px' }}>
                    <h3>Editando a: {instructorEditando.name}</h3>
                    <form onSubmit={manejarActualizacion}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Nombre: </label>
                            <input
                                type="text"
                                name="name"
                                value={instructorEditando.name || ''}
                                onChange={manejarCambioInput}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Correo: </label>
                            <input
                                type="email"
                                name="email"
                                value={instructorEditando.email || ''}
                                onChange={manejarCambioInput}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Calle: </label>
                            {/* Leemos directamente instructorEditando.street */}
                            <input
                                type="text"
                                name="street"
                                value={instructorEditando.street || ''}
                                onChange={manejarCambioInput}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Ciudad: </label>
                            {/* Leemos directamente instructorEditando.city */}
                            <input
                                type="text"
                                name="city"
                                value={instructorEditando.city || ''}
                                onChange={manejarCambioInput}
                                required
                            />
                        </div>
                        <button type="submit" style={{ marginRight: '10px', backgroundColor: '#28a745', color: 'white' }}>
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={() => setInstructorEditando(null)}>
                            Cancelar
                        </button>
                    </form>
                </div>
            )}

            <ul className="lista-usuarios">
                {usuarios.map((usuario) => (
                    <li key={usuario.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                        <h3>{usuario.name}</h3>
                        <h4>{usuario.email}</h4>
                        {/* Imprimimos directamente usuario.street y usuario.city */}
                        <p>{usuario.street || 'Sin calle'}, {usuario.city || 'Sin ciudad'}</p>
                        
                        <button onClick={() => setInstructorEditando(usuario)}>
                            Editar Instructor
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default InstructoresPage;