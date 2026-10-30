# React + Vite

## Persistencia de aprendices

Los registros y las actualizaciones se guardan en `data/aprendices.json` mediante una API local de Node.js. Inicia la aplicación con:

```sh
npm install
npm run dev
```

El comando inicia la aplicación Vite y la API local. No cierres la terminal mientras uses la aplicación. Los datos se escriben en el archivo JSON del proyecto.

La API local admite `GET /api/aprendices` y `GET /api/aprendices/:id` para consultar, `POST /api/aprendices` para registrar, `PUT /api/aprendices/:id` para reemplazar los datos, `PATCH /api/aprendices/:id` para modificar solo los campos enviados y `DELETE /api/aprendices/:id` para eliminar.

Esta persistencia local está pensada para desarrollo en esta máquina; una publicación en producción requiere desplegar también la API en un servidor con almacenamiento persistente.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Carmona es putita
si soy 
si es
diego lo es mas

rawr