const formateador = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

// 57000 -> "$57.000"
export const formatoCOP = (valor) => formateador.format(valor).replace(/\s/g, '')
