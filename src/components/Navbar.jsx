// PUNTO 2 – Navbar fija arriba: nombre a la izquierda, ícono del carrito a la derecha
export default function Navbar({ totalUnidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <h1 className="navbar__nombre">Tienda Palmira</h1>

      <button
        type="button"
        className="navbar__carrito"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${totalUnidades} ${totalUnidades === 1 ? 'unidad' : 'unidades'}`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 11.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6" />
        </svg>
        {totalUnidades > 0 && (
          <span className="navbar__contador">{totalUnidades}</span>
        )}
      </button>
    </header>
  )
}
