import CampoCantidad from './CampoCantidad.jsx'
import { formatoCOP } from '../utils/formato.js'
import { MSG_MAXIMO } from '../utils/mensajes.js'

// PUNTOS 5, 6 y 7 – Línea del carrito: − / campo / +, subtotal y botón para quitar
export default function CartItem({
  producto, cantidad, onCambiarCantidad, onQuitar, onPedirEliminar, onAviso,
}) {
  const restar = () => {
    if (cantidad <= 1) onPedirEliminar(producto)      // mínimo 1: toast con opción de eliminar
    else onCambiarCantidad(producto.id, cantidad - 1)
  }

  const sumar = () => {
    if (cantidad >= producto.stock) onAviso(MSG_MAXIMO) // nunca supera el stock
    else onCambiarCantidad(producto.id, cantidad + 1)
  }

  return (
    <li className="linea">
      <div className="linea__info">
        <p className="linea__nombre">{producto.nombre}</p>
        <p className="linea__unitario">{formatoCOP(producto.precio)} c/u</p>
      </div>

      <div className="linea__cantidad">
        <button type="button" className="boton boton--cuadrado" onClick={restar}
                aria-label={`Restar una unidad de ${producto.nombre}`}>−</button>
        <CampoCantidad
          valor={cantidad}
          max={producto.stock}
          etiqueta={`Cantidad de ${producto.nombre} en el carrito`}
          onCambio={(n) => onCambiarCantidad(producto.id, n)}
          onMinimo={() => onPedirEliminar(producto)}
          onMaximo={() => onAviso(MSG_MAXIMO)}
        />
        <button type="button" className="boton boton--cuadrado" onClick={sumar}
                aria-label={`Sumar una unidad de ${producto.nombre}`}>+</button>
      </div>

      <p className="linea__subtotal">{formatoCOP(producto.precio * cantidad)}</p>

      <button type="button" className="boton boton--texto" onClick={() => onQuitar(producto.id)}
              aria-label={`Quitar ${producto.nombre} del carrito`}>
        Quitar
      </button>
    </li>
  )
}
