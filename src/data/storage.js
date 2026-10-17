// Capa mínima de persistencia sobre localStorage (usada por todos los *DB.js)

const copiar = (valor) => JSON.parse(JSON.stringify(valor));

export function leer(clave, semilla) {
  try {
    const raw = localStorage.getItem(clave);
    if (raw === null || raw === undefined) {
      if (semilla !== undefined && semilla !== null) {
        localStorage.setItem(clave, JSON.stringify(semilla));
      }
      return semilla === undefined || semilla === null ? semilla : copiar(semilla);
    }
    return JSON.parse(raw);
  } catch {
    return semilla === undefined || semilla === null ? semilla : copiar(semilla);
  }
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
  return valor;
}

export function borrar(clave) {
  localStorage.removeItem(clave);
}