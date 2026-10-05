import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTOS } from './data/productos.js'
import Navbar from './components/Navbar.jsx'
import ProductCard from './components/ProductCard.jsx'
import Cart from './components/Cart.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import { MSG_MAXIMO, msgMinimoCarrito } from './utils/mensajes.js'

const CLAVE_STORAGE = 'tienda-palmira-carrito'

// Valor agregado: el carrito se conserva al recargar (validando contra el stock)
function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE))
    if (!Array.isArray(guardado)) return []
    const vistos = new Set()
    return guardado.filter((item) => {
      const p = PRODUCTOS.find((x) => x.id === item.id)
      const valido = p && !vistos.has(p.id) && Number.isInteger(item.cantidad)
        && item.cantidad >= 1 && item.cantidad <= p.stock
      if (valido) vistos.add(p.id)
      return valido
    })
  } catch {
    return []
  }
}

export default function App() {
  // El carrito guarda solo { id, cantidad }; los datos del producto salen del catálogo
  const [carrito, setCarrito] = useState(cargarCarrito)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [toasts, setToasts] = useState([])
  const contadorToasts = useRef(0)

  useEffect(() => {
    try { localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito)) } catch { /* sin storage */ }
  }, [carrito])

  // ---------- Toasts ----------
  const mostrarToast = useCallback((mensaje, accion) => {
    contadorToasts.current += 1
    const nuevo = { id: contadorToasts.current, mensaje, accion }
    // si ya hay un toast con el mismo mensaje se reemplaza (no se apilan repetidos)
    setToasts((prev) => [...prev.filter((t) => t.mensaje !== mensaje), nuevo])
  }, [])

  const cerrarToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ---------- Carrito ----------
  const cantidadEnCarrito = (id) => carrito.find((i) => i.id === id)?.cantidad ?? 0

  // PUNTOS 3 y 5: suma a la línea existente, sin pasar del stock
  const agregar = (producto, cantidad) => {
    const actual = cantidadEnCarrito(producto.id)
    const deseada = actual + cantidad
    const final = Math.min(deseada, producto.stock)

    if (deseada > producto.stock) mostrarToast(MSG_MAXIMO)
    if (final === actual) return

    setCarrito((prev) =>
      prev.some((i) => i.id === producto.id)
        ? prev.map((i) => (i.id === producto.id ? { ...i, cantidad: final } : i))
        : [...prev, { id: producto.id, cantidad: final }]
    )
  }

  const cambiarCantidad = useCallback((id, cantidad) => {
    setCarrito((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)))
  }, [])

  const quitar = useCallback((id) => {
    setCarrito((prev) => prev.filter((i) => i.id !== id))
  }, [])

  // PUNTO 6: cantidad mínima -> toast que pregunta si desea eliminar
  const pedirEliminar = (producto) => {
    mostrarToast(msgMinimoCarrito(producto.nombre), {
      etiqueta: 'Eliminar',
      onClick: () => quitar(producto.id),
    })
  }

  // ---------- Totales (PUNTO 7) ----------
  const lineas = useMemo(
    () => carrito.map((i) => ({ producto: PRODUCTOS.find((p) => p.id === i.id), cantidad: i.cantidad })),
    [carrito]
  )
  const totalUnidades = lineas.reduce((suma, l) => suma + l.cantidad, 0)
  const totalCompra = lineas.reduce((suma, l) => suma + l.producto.precio * l.cantidad, 0)

  const cerrarCarrito = useCallback(() => setCarritoAbierto(false), [])

  return (
    <>
      <Navbar totalUnidades={totalUnidades} onAbrirCarrito={() => setCarritoAbierto(true)} />

      <main className="catalogo">
        <h2 className="catalogo__titulo">Productos típicos de la región</h2>
        <div className="catalogo__rejilla">
          {PRODUCTOS.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              enCarrito={cantidadEnCarrito(producto.id)}
              onAgregar={agregar}
              onAviso={mostrarToast}
            />
          ))}
        </div>
      </main>

      <Cart
        abierto={carritoAbierto}
        lineas={lineas}
        totalUnidades={totalUnidades}
        totalCompra={totalCompra}
        onCerrar={cerrarCarrito}
        onCambiarCantidad={cambiarCantidad}
        onQuitar={quitar}
        onPedirEliminar={pedirEliminar}
        onAviso={mostrarToast}
      />

      <ToastContainer toasts={toasts} onCerrar={cerrarToast} />
    </>
  )
}
