// Formatea pesos chilenos: 12000 -> "$12.000"
export function formatearPrecio(valor) {
  const numero = Math.round(Number(valor) || 0);
  return '$' + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatearFecha(iso) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return '';
  return fecha.toLocaleDateString('es-CL');
}