# Estructura del proyecto — Metraje Sel

Selector de serie o película para ver. El repositorio conserva la versión original en HTML/CSS/JS y la versión migrada a React (Vite).

## Árbol de archivos

```text
.
├── README.md
├── ESTRUCTURA.md
├── pag web base/                  # Versión original (vanilla)
│   └── css/
│       ├── index.html             # Estructura: formulario, lista y <dialog>
│       ├── style.css              # Paleta, tipografías y estilos
│       └── script.js              # localStorage, agregar/eliminar, azar y modal
└── mi-app-react/                  # Versión React + Vite
    ├── index.html                 # HTML base (lang="es", título "Metraje Sel")
    ├── package.json               # Dependencias y scripts
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── main.jsx               # Punto de entrada: monta <App /> en #root
        ├── App.jsx                # Compone la página y coordina el estado
        ├── App.css                # Copia de "pag web base/css/style.css"
        ├── components/
        │   ├── FormularioMetraje.jsx  # Campos controlados y botones Guardar/Escoger
        │   ├── ListaMetrajes.jsx      # <ul> de películas/series con botón Eliminar
        │   └── ModalResultado.jsx     # <dialog> con Aceptar/Cerrar y arrastre
        ├── hooks/
        │   └── useMetrajes.js     # Estado, persistencia y operaciones de la lista
        └── assets/
            ├── hero.png
            ├── react.svg
            └── vite.svg
```

> No se incluyen `.git/`, `node_modules/` ni archivos generados.

## Descripción de los archivos de React

| Archivo | Responsabilidad |
| --- | --- |
| `src/main.jsx` | Crea la raíz de React con `StrictMode`. |
| `src/App.jsx` | Mantiene la selección aleatoria y conecta formulario, lista y modal. |
| `src/hooks/useMetrajes.js` | Carga y guarda en `localStorage` (clave `metrajes`); expone `agregar` y `eliminar`. |
| `src/components/FormularioMetraje.jsx` | Gestiona `nombre` y `tipo`, valida y limpia los campos tras guardar. |
| `src/components/ListaMetrajes.jsx` | Dibuja cada entrada como `nombre (tipo)` con su botón **Eliminar**. |
| `src/components/ModalResultado.jsx` | Abre/cierra el `<dialog>` con `showModal()`/`close()` y permite arrastrarlo. |
| `src/App.css` | Todos los estilos migrados de la web base. |

## Flujo de datos

1. `FormularioMetraje` llama a `onGuardar` → `agregar` → `useMetrajes` actualiza el array y lo persiste.
2. `ListaMetrajes` recibe `metrajes` y llama a `onEliminar(indice)` desde cada botón.
3. **Escoger al azar** guarda `{ ...item, indice }` en `App`; `ModalResultado` muestra el resultado.
4. **Aceptar** elimina ese índice real y cierra el modal; **Cerrar** (o `Esc`) solo lo cierra.

## Notas de la migración

- Se conservan el diseño, los textos y la clave de `localStorage` (`metrajes`) de la web base.
- Se corrigieron los atributos JSX inválidos (`class` → `className`, `for` → `htmlFor`, `selected` → `value`).
- Se corrigió el bug original: el botón **Aceptar** ahora elimina correctamente el elemento elegido (antes usaba `elegido.indice`, que no existía).
- La carga de `localStorage` tolera datos corruptos y el modal se cierra también con `Esc`.
