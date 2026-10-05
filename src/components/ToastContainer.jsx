import { useEffect } from 'react'

// Toast individual: desaparece solo y se puede cerrar a mano (no se usa alert())
function Toast({ toast, onCerrar }) {
  const { id, mensaje, accion } = toast

  useEffect(() => {
    const t = setTimeout(() => onCerrar(id), accion ? 7000 : 4000)
    return () => clearTimeout(t)
  }, [id, accion, onCerrar])

  return (
    <div className="toast">
      <p className="toast__mensaje">{mensaje}</p>
      {accion && (
        <button
          type="button"
          className="boton boton--alerta"
          onClick={() => { accion.onClick(); onCerrar(id) }}
        >
          {accion.etiqueta}
        </button>
      )}
      <button type="button" className="toast__cerrar" onClick={() => onCerrar(id)}
              aria-label="Cerrar aviso">✕</button>
    </div>
  )
}

export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onCerrar={onCerrar} />
      ))}
    </div>
  )
}
