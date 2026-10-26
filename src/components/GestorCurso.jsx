import { useState } from "react";
import "./tarjetas.css";

function GestorCurso({ cursos, setCursos }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [indiceCurso, setIndiceCurso] = useState(0);

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setUrl("");
    setId(null);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      url.trim() === ""
    ) {
      setMensaje("Completa todos los campos.");
      return;
    }

    const cursoActualizado = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      url: url.trim(),
    };

    if (id !== null) {
      setCursos((cursosActuales) =>
        cursosActuales.map((curso) =>
          curso.id === id ? { ...curso, ...cursoActualizado } : curso,
        ),
      );
      setMensaje("Curso actualizado correctamente.");
    } else {
      setCursos((cursosActuales) => [
        ...cursosActuales,
        { id: Date.now(), ...cursoActualizado },
      ]);
      setMensaje("Curso agregado correctamente.");
    }

    limpiarFormulario();
  }

  function editarCurso(curso) {
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setUrl(curso.url || "");
    setId(curso.id);
    setMensaje("");
  }

  function eliminarCurso(idEliminar) {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este curso?",
    );

    if (!confirmar) {
      return;
    }

    const indiceEliminar = cursos.findIndex((curso) => curso.id === idEliminar);
    setCursos((cursosActuales) =>
      cursosActuales.filter((curso) => curso.id !== idEliminar),
    );

    if (indiceEliminar < indiceCurso) {
      setIndiceCurso(indiceCurso - 1);
    } else if (indiceEliminar === indiceCurso) {
      setIndiceCurso(Math.min(indiceCurso, cursos.length - 2));
    }

    if (id === idEliminar) {
      limpiarFormulario();
    }

    setMensaje("Curso eliminado correctamente.");
  }

  function cancelarEdicion() {
    limpiarFormulario();
    setMensaje("");
  }

  function siguienteCurso() {
    setIndiceCurso((indiceActual) => (indiceActual + 1) % cursos.length);
  }

  const cursoActual = cursos[indiceCurso % cursos.length];

  return (
    <div>
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="nombre-curso">Nombre del curso:</label>
          <input
            id="nombre-curso"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Ej. Inteligencia Artificial"
            required
          />
        </div>

        <div>
          <label htmlFor="descripcion-curso">Descripción:</label>
          <input
            id="descripcion-curso"
            type="text"
            value={descripcion}
            onChange={(evento) => setDescripcion(evento.target.value)}
            placeholder="Describe el curso"
            required
          />
        </div>

        <div>
          <label htmlFor="url-curso">Imagen del curso (URL):</label>
          <input
            id="url-curso"
            type="url"
            value={url}
            onChange={(evento) => setUrl(evento.target.value)}
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <button type="submit">
            {id !== null ? "Guardar cambios" : "Agregar curso"}
          </button>
          {id !== null && (
            <button type="button" onClick={cancelarEdicion}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {mensaje && (
        <p role="status" aria-live="polite">
          {mensaje}
        </p>
      )}

      <h3>Cursos registrados: {cursos.length}</h3>

      {cursos.length === 0 ? (
        <p>No hay cursos registrados.</p>
      ) : (
        <div className="url">
          <article key={cursoActual.id}>
            {cursoActual.url && (
              <img src={cursoActual.url} alt={cursoActual.nombre} />
            )}
            <h3>{cursoActual.nombre}</h3>
            <p>{cursoActual.descripcion}</p>
            <button type="button" onClick={() => editarCurso(cursoActual)}>
              Editar
            </button>
            <button
              type="button"
              onClick={() => eliminarCurso(cursoActual.id)}
            >
              Eliminar
            </button>
          </article>
        </div>
      )}
      {cursos.length > 1 && (
        <div>
          <p>
            {indiceCurso + 1} de {cursos.length}
          </p>
          <button type="button" onClick={siguienteCurso}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default GestorCurso;
