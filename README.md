# Carrito de Compras con Validaciones de Stock – TIENDA PALMIRA

**Reto práctico – React**

| | |
|---|---|
| **Aprendiz** ocampo sebas
| **Ficha** 3409924
| **Instructor**  Daniel Alfonso Martínez Payán 
| **Tecnología usada**  React (con Vite) 

## Qué hace la aplicación

Carrito de compras para la tienda virtual TIENDA PALMIRA. El catálogo sale de un array JSON escrito en el frontend (`src/data/productos.js`) y toda la información que escribe el usuario se valida antes de aceptarse. Cada intento no permitido se avisa con un **toast** (nunca con `alert()`).

- Navbar fija con el nombre de la tienda a la izquierda y el ícono del carrito a la derecha, con contador de unidades (se oculta si es 0).
- Catálogo con nombre, precio, stock, campo de cantidad (inicia en 1) y botón **Agregar**.
- Si el producto ya está en el carrito, se suma a la misma línea (no se duplica).
- Campo de cantidad: solo enteros positivos. Bloquea `e`, `E`, `+`, `-`, `.`, `,`, rechaza texto pegado que no sea solo dígitos, no acepta 0 y la rueda del mouse no cambia el valor.
- Nunca se supera el stock (al escribir, con el botón `+` y al agregar de nuevo): se corrige al máximo y aparece el toast *"Este es el máximo de producto disponible en stock"*.
- Cantidad mínima 1: al pulsar `−` (o escribir 0) en el carrito aparece un toast que pregunta si se quiere eliminar el producto, con botón para confirmar. También hay un botón **Quitar**.
- Subtotal por línea, total de la compra y total de unidades, en formato de moneda COP.
- Valor agregado: el carrito se guarda en `localStorage`, el panel se cierra con Escape, botones con etiquetas para lectores de pantalla y toasts anunciables.

## Cómo instalar y ejecutar

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
git clone <ENLACE_DEL_REPOSITORIO>
cd Apellido_Nombre_CarritoReact
npm install
npm run dev
```

Abre en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción: `npm run build`.

## Estructura

```
src/
├── App.jsx                  # estado del carrito, toasts y totales
├── data/productos.js        # catálogo (array JSON)
├── utils/                   # formato de moneda COP y mensajes de los toasts
└── components/
    ├── Navbar.jsx
    ├── ProductCard.jsx
    ├── CampoCantidad.jsx    # campo numérico reutilizable con todas las validaciones
    ├── Cart.jsx             # panel lateral
    ├── CartItem.jsx         # línea del carrito
    └── ToastContainer.jsx
```

## Evidencias

Las capturas están en la carpeta [`/evidencias`](./evidencias).

| # | Funcionalidad | Captura (nombre o ruta) | ¿Funciona? |
|---|---|---|---|
| 1 | Navbar e ícono con contador | `evidencias/01-navbar-contador.png` | Sí |
| 2 | Agregar producto desde el catálogo | `evidencias/02-agregar-producto.png` | Sí |
| 3 | Bloqueo de la tecla "e" y de negativos / 0 | `evidencias/03-bloqueo-e-negativos.png` | Sí |
| 4 | Toast de stock máximo | `evidencias/04-toast-stock-maximo.png` | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | `evidencias/05-toast-minimo-eliminar.png` | Sí |
| 6 | Subtotales y total con varios productos | `evidencias/06-subtotales-total.png` | Sí |
| 7 | Producto eliminado y total recalculado | `evidencias/07-producto-eliminado.png` | Sí |

## Casos de prueba del instructor

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Teclear `e`, `E`, `+`, `-`, `.` o `,` en un campo de cantidad | La tecla no escribe nada |
| 2 | Pegar `-5`, `3e2` o `abc` | No se pega |
| 3 | Escribir `0` en la tarjeta del producto | No lo acepta, conserva el valor y muestra toast de mínimo 1 |
| 4 | Escribir `0` en el carrito | La cantidad no cambia y aparece el toast con opción de eliminar |
| 5 | Escribir `999` en un producto con stock 8 | Se corrige a 8 y aparece el toast de máximo |
| 6 | Panela (stock 3): agregar 2 y luego 2 más | Queda en 3 y aparece el toast de máximo |
| 7 | En el carrito, `+` con la cantidad igual al stock | No sube y aparece el toast de máximo |
| 8 | En el carrito, `−` con cantidad 1 | Toast de mínimo; al confirmar el producto sale y el total se recalcula |
| 9 | Agregar dos veces el mismo producto | Una sola línea con cantidades sumadas |
| 10 | Café ×2, Panela ×3 y Arepa ×1 | $57.000, $29.400 y $12.000. Total: $98.400 |
| 11 | Agregar todo el stock de un producto (Chocolate ×1) | El botón Agregar queda deshabilitado |
| 12 | Agregar productos y mirar la navbar | Ícono a la derecha con la suma de unidades |
