const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

// Correo con dominio permitido (duoc.cl, profesor.duoc.cl o gmail.com)
export function validarCorreo(correo = '') {
  const match = correo.trim().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  if (!match) return false;
  return DOMINIOS_PERMITIDOS.includes(match[1].toLowerCase());
}

// RUN chileno sin puntos ni guion (ej: 19011022K), dígito verificador módulo 11
export function validarRut(valor = '') {
  const rut = valor.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(rut)) return false;
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return dv === esperado;
}

export function validarClave(clave = '') {
  return clave.length >= 6 && clave.length <= 20;
}

export function validarObligatorio(valor) {
  return String(valor ?? '').trim().length > 0;
}

export function validarNumeroNoNegativo(valor) {
  const n = Number(valor);
  return valor !== '' && Number.isFinite(n) && n >= 0;
}