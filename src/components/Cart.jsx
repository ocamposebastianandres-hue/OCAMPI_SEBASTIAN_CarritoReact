import { useEffect, useRef } from 'react'
import CartItem from './CartItem.jsx'
import { formatoCOP } from '../utils/formato.js'

// PUNTOS 2 y 7 – Panel lateral del carrito (se puede cerrar) con total de compra y de unidades
export default function Cart({
  abierto, lineas, totalUnidades, totalCompra, onCerrar,
  onCambiarCantidad, onQuitar, onPedirEliminar, onAviso,
}) {
  const botonCerrar = useRef(null)

  // Escape cierra el panel; al abrir, el foco va al botón de cerrar
  useEffect(() => {
    if (!abierto) return
    botonCerrar.current?.focus()
    const alTeclear = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [abierto, onCerrar])

  return (
    <>
      <div className={`velo ${abierto ? 'velo--visible' : ''}`} onClick={onCerrar} aria-hidden="true" />
      <aside
        className={`panel ${abierto ? 'panel--abierto' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        hidden={!abierto}
      >
        <div className="panel__cabecera">
          <h2>Tu carrito</h2>
          <button ref={botonCerrar} type="button" className="boton boton--cuadrado"
                  onClick={onCerrar} aria-label="Cerrar carrito">✕</button>
        </div>

        {lineas.length === 0 ? (
          <p className="panel__vacio">Todavía no has agregado productos. Elige algo del catálogo.</p>
        ) : (
          <ul className="panel__lista">
            {lineas.map(({ producto, cantidad }) => (
              <CartItem
                key={producto.id}
                producto={producto}
                cantidad={cantidad}
                onCambiarCantidad={onCambiarCantidad}
                onQuitar={onQuitar}
                onPedirEliminar={onPedirEliminar}
                onAviso={onAviso}
              />
            ))}
          </ul>
        )}

        <div className="panel__totales">
          <p><span>Total de unidades</span> <strong>{totalUnidades}</strong></p>
          <p className="panel__total"><span>Total de la compra</span> <strong>{formatoCOP(totalCompra)}</strong></p>
        </div>
      </aside>
    </>
  )
}
