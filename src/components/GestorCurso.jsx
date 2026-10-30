import { useState } from "react";
import "./tarjetas.css";

function GestorCurso({ cursos, onCrearCurso, onGuardarCurso, onEliminarCurso }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [indiceCurso, setIndiceCurso] = useState(0);


  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setUrl("");
    setId(null);
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje("");
    setError("");

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

    setProcesando(true);
    try {
      if (id !== null) {
        await onGuardarCurso(id, cursoActualizado);
        setMensaje("Curso actualizado correctamente.");
      } else {
        await onCrearCurso(cursoActualizado);
        setMensaje("Curso agregado correctamente.");
      }
      limpiarFormulario();
    } catch (errorGuardandoCurso) {
      console.error(errorGuardandoCurso);
      setError(errorGuardandoCurso.message || "No se pudo guardar el curso.");
    } finally {
      setProcesando(false);
    }
  }

  function editarCurso(curso) {
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setUrl(curso.url || "");
    setId(curso.id);
    setMensaje("");
  }

  async function eliminarCurso(idEliminar) {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este curso?",
    );

    if (!confirmar) {
      return;
    }

    setMensaje("");
    setError("");
    setProcesando(true);
    try {
      const indiceEliminar = cursos.findIndex((curso) => curso.id === idEliminar);
      await onEliminarCurso(idEliminar);

      if (indiceEliminar < indiceCurso) {
        setIndiceCurso(indiceCurso - 1);
      } else if (indiceEliminar === indiceCurso) {
        setIndiceCurso(Math.max(0, Math.min(indiceCurso, cursos.length - 2)));
      }

      if (id === idEliminar) {
        limpiarFormulario();
      }
      setMensaje("Curso eliminado correctamente.");
    } catch (errorEliminandoCurso) {
      console.error(errorEliminandoCurso);
      setError(errorEliminandoCurso.message || "No se pudo eliminar el curso.");
    } finally {
      setProcesando(false);
    }
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
          <button type="submit" disabled={procesando}>
            {id !== null ? "Guardar cambios" : "Agregar curso"}
          </button>
          {id !== null && (
            <button type="button" onClick={cancelarEdicion} disabled={procesando}>
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
      {error && <p role="alert">{error}</p>}

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
            <button type="button" onClick={() => editarCurso(cursoActual)} disabled={procesando}>
              Editar
            </button>
            <button
              type="button"
              onClick={() => eliminarCurso(cursoActual.id)}
              disabled={procesando}
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
          <button type="button" onClick={siguienteCurso} disabled={procesando}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default GestorCurso;
