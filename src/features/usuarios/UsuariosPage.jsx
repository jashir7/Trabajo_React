import { useState, useEffect } from 'react';

function AprendicesPage() {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensajeCreacion, setMensajeCreacion] = useState('');

  const [aprendizEditando, setAprendizEditando] = useState(null);
  const [mensajeInteraccion, setMensajeInteraccion] = useState(''); // Mensaje global para PUT y DELETE

  const API_URL = 'https://6ae4a01528393034b08dc7a2.mockapi.io/Usuarios';

  // 1. GET: Leer
  useEffect(() => {
    const fetchAprendices = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener los aprendices');
        const data = await response.json();
        setAprendices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAprendices();
  }, []);

  // 2. POST: Crear
  const manejarCreacion = (e) => {
    e.preventDefault();
    setMensajeCreacion('Creando aprendiz...');

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nombre, email: correo })
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Falló la creación");
        return respuesta.json();
      })
      .then((nuevoAprendiz) => {
        setAprendices([...aprendices, nuevoAprendiz]);
        setMensajeCreacion(`¡Éxito! Aprendiz creado.`);
        setNombre('');
        setCorreo('');
        setTimeout(() => setMensajeCreacion(''), 3000);
      })
      .catch(() => {
        setMensajeCreacion("Error al crear el aprendiz.");
      });
  };

  // 3. PUT: Actualización completa
  const manejarActualizacionCompleta = (e) => {
    e.preventDefault();
    setMensajeInteraccion('Actualizando todos los datos...');

    fetch(`${API_URL}/${aprendizEditando.id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aprendizEditando),
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al actualizar');
        return respuesta.json();
      })
      .then((datosActualizados) => {
        const nuevaLista = aprendices.map((aprendiz) =>
          aprendiz.id === aprendizEditando.id ? datosActualizados : aprendiz
        );
        setAprendices(nuevaLista);
        setMensajeInteraccion(`¡Aprendiz actualizado con éxito (PUT)!`);
        setAprendizEditando(null); 
        setTimeout(() => setMensajeInteraccion(''), 3000);
      })
      .catch((error) => console.error(error));
  };

  // 4. DELETE: Eliminar aprendiz
  const manejarEliminacion = (id, nombre) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar al aprendiz "${nombre}"?`);
    if (!confirmar) return;

    setMensajeInteraccion('Eliminando aprendiz...');

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al eliminar');
        return respuesta.json();
      })
      .then(() => {
        const nuevaLista = aprendices.filter((aprendiz) => aprendiz.id !== id);
        setAprendices(nuevaLista);
        
        setMensajeInteraccion(`¡Aprendiz "${nombre}" eliminado correctamente!`);
        setTimeout(() => setMensajeInteraccion(''), 3000);
      })
      .catch((error) => {
        setMensajeInteraccion('Error al eliminar el aprendiz.');
        console.error(error);
      });
  };

  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;
    setAprendizEditando({ ...aprendizEditando, [name]: value });
  };

  if (loading) return <p>Cargando aprendices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="usuarios-api">
      <h2>Gestión de Aprendices</h2>
      <p>Conectado a MockAPI: Crear (POST), Leer (GET), Editar todo (PUT) y Eliminar (DELETE).</p>

      {/* FORMULARIO POST */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Agregar nuevo aprendiz</h3>
        <form onSubmit={manejarCreacion}>
          <div style={{ marginBottom: '10px' }}>
            <label>Nombre: </label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Correo: </label>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 15px', border: 'none', cursor: 'pointer' }}>
            Crear Aprendiz
          </button>
        </form>
        {mensajeCreacion && <p style={{ color: 'blue' }}><strong>{mensajeCreacion}</strong></p>}
      </div>

      {/* MENSAJE GLOBAL (PUT, DELETE) */}
      {mensajeInteraccion && <p style={{ color: '#d39e00', fontSize: '18px' }}><strong>{mensajeInteraccion}</strong></p>}

      {/* FORMULARIO PUT */}
      {aprendizEditando && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #28a745', borderRadius: '8px' }}>
          <h3>Edición Completa: {aprendizEditando.name}</h3>
          <form onSubmit={manejarActualizacionCompleta}>
            <div style={{ marginBottom: '10px' }}>
              <label>Nombre: </label>
              <input type="text" name="name" value={aprendizEditando.name || ''} onChange={manejarCambioEdicion} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Correo: </label>
              <input type="email" name="email" value={aprendizEditando.email || ''} onChange={manejarCambioEdicion} required />
            </div>
            <button type="submit" style={{ marginRight: '10px', backgroundColor: '#28a745', color: 'white', padding: '5px 15px', border: 'none', cursor: 'pointer' }}>
              Guardar Todo
            </button>
            <button type="button" onClick={() => setAprendizEditando(null)} style={{ padding: '5px 15px', cursor: 'pointer' }}>
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* LISTA (GET) */}
      <ul className="lista-usuarios" style={{ listStyle: 'none', padding: 0 }}>
        {aprendices.map((aprendiz) => (
          <li key={aprendiz.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{aprendiz.name}</h3>
            <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>{aprendiz.email}</h4>
            
            <button 
              onClick={() => setAprendizEditando(aprendiz)}
              style={{ backgroundColor: '#ffc107', border: 'none', padding: '8px 12px', cursor: 'pointer', marginRight: '10px' }}
            >
              Editar (PUT)
            </button>

            {/* BOTÓN DELETE */}
            <button 
              onClick={() => manejarEliminacion(aprendiz.id, aprendiz.name)}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer' }}
            >
              Eliminar (DELETE)
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AprendicesPage;