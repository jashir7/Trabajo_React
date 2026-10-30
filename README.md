# Centro Nacional Colombo Aleman

## Desarrollo local

Instala las dependencias e inicia Vite junto con la API local:

```sh
npm install
npm run dev
```

La API escucha solo en la máquina local. Mantén abierta la terminal mientras uses la aplicación.

## Persistencia

Los aprendices, los cursos y la presentación se guardan en archivos JSON dentro de `data/`:

- `data/aprendices.json`
- `data/cursos.json`
- `data/presentacion.json`

Los archivos de aprendices y presentación se excluyen de Git para evitar publicar información personal. Haz copias de seguridad de esos archivos por separado; no se sincronizan entre equipos ni se incluyen automáticamente en el repositorio. El catálogo inicial de cursos está versionado y sus cambios locales pueden aparecer en Git.

Los registros anteriores de aprendices, cursos y presentación que estaban en `localStorage` se migran al JSON la próxima vez que se consulta o guarda esa sección.

## API local

- `GET /api/aprendices` y `GET /api/aprendices/:id`: consultar aprendices.
- `POST /api/aprendices`: registrar un aprendiz.
- `PUT /api/aprendices/:id`: reemplazar sus datos.
- `PATCH /api/aprendices/:id`: modificar campos.
- `DELETE /api/aprendices/:id`: eliminar un aprendiz.
- `GET /api/cursos`, `POST /api/cursos`, `PUT /api/cursos/:id` y `DELETE /api/cursos/:id`: gestionar cursos.
- `GET /api/presentacion` y `PUT /api/presentacion`: consultar y guardar la presentación.

## Validación

```sh
npm run lint
npm run build
```
