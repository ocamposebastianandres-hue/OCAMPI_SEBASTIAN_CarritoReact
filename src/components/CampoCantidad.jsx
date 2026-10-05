import { useEffect, useState } from 'react'

// Teclas que el input numérico deja escribir pero que no queremos
const TECLAS_BLOQUEADAS = ['e', 'E', '+', '-', '.', ',']

/**
 * PUNTO 4 – Campo de cantidad reutilizable (catálogo y carrito).
 * Solo acepta enteros positivos, nunca supera `max` y nunca baja de 1.
 */
export default function CampoCantidad({
  valor, max, onCambio, onMinimo, onMaximo, etiqueta, deshabilitado = false,
}) {
  // Texto mostrado: permite quedar vacío mientras se escribe
  const [texto, setTexto] = useState(String(valor))

  useEffect(() => {
    setTexto(String(valor))
  }, [valor])

  // Bloquea e, E, +, -, punto y coma antes de que lleguen al campo
  const alPulsarTecla = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) e.preventDefault()
  }

  // Si el texto pegado no son solo dígitos, se rechaza
  const alPegar = (e) => {
    const pegado = e.clipboardData.getData('text')
    if (!/^\d+$/.test(pegado)) e.preventDefault()
  }

  const alCambiar = (e) => {
    const crudo = e.target.value

    if (crudo === '') {              // el usuario borró el número
      setTexto('')
      return
    }
    if (!/^\d+$/.test(crudo)) return // lo que no sean dígitos se ignora

    const n = parseInt(crudo, 10)

    if (n === 0) {                   // 0 no se acepta: se conserva el valor anterior
      setTexto(String(valor))
      onMinimo?.()
      return
    }
    if (n > max) {                   // se corrige al máximo y se avisa
      setTexto(String(max))
      onCambio(max)
      onMaximo?.()
      return
    }
    setTexto(String(n))
    onCambio(n)
  }

  // Si queda vacío al salir del campo, se restaura el último valor válido
  const alSalir = () => {
    if (texto === '') setTexto(String(valor))
  }

  return (
    <input
      className="campo-cantidad"
      type="number"
      inputMode="numeric"
      min={1}
      max={max}
      step={1}
      value={texto}
      disabled={deshabilitado}
      aria-label={etiqueta}
      onKeyDown={alPulsarTecla}
      onPaste={alPegar}
      onChange={alCambiar}
      onBlur={alSalir}
      onWheel={(e) => e.currentTarget.blur()} // la rueda del mouse no cambia el valor
    />
  )
}
