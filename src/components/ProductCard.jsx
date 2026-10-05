import { useState } from 'react'
import CampoCantidad from './CampoCantidad.jsx'
import { formatoCOP } from '../utils/formato.js'
import { MSG_MAXIMO, MSG_MINIMO_TARJETA } from '../utils/mensajes.js'

// PUNTO 3 – Tarjeta de producto: nombre, precio, stock, cantidad (inicia en 1) y botón Agregar
export default function ProductCard({ producto, enCarrito, onAgregar, onAviso }) {
  const [cantidad, setCantidad] = useState(1)
  const sinDisponibles = enCarrito >= producto.stock

  const agregar = () => {
    onAgregar(producto, cantidad)
    setCantidad(1)
  }

  return (
    <article className="tarjeta">
      <h3 className="tarjeta__nombre">{producto.nombre}</h3>
      <p className="tarjeta__precio">{formatoCOP(producto.precio)}</p>
      <p className="tarjeta__stock">
        Stock: <strong>{producto.stock}</strong>
        {enCarrito > 0 && <span> · En tu carrito: {enCarrito}</span>}
      </p>

      <div className="tarjeta__acciones">
        <CampoCantidad
          valor={cantidad}
          max={producto.stock}
          etiqueta={`Cantidad de ${producto.nombre}`}
          deshabilitado={sinDisponibles}
          onCambio={setCantidad}
          onMinimo={() => onAviso(MSG_MINIMO_TARJETA)}
          onMaximo={() => onAviso(MSG_MAXIMO)}
        />
        <button
          type="button"
          className="boton boton--principal"
          onClick={agregar}
          disabled={sinDisponibles}
        >
          {sinDisponibles ? 'Sin stock disponible' : 'Agregar'}
        </button>
      </div>
    </article>
  )
}
