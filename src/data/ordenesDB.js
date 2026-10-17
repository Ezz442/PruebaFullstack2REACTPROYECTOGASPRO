import { leer, guardar } from './storage.js';
import { ordenesSeed } from './data.js';

const CLAVE = 'gaspro_ordenes';

export function obtenerOrdenes() {
  return leer(CLAVE, ordenesSeed);
}

export function obtenerOrden(id) {
  return obtenerOrdenes().find((o) => String(o.id) === String(id)) || null;
}

export function obtenerUltimaOrden() {
  const lista = obtenerOrdenes();
  return lista.length ? lista[lista.length - 1] : null;
}

export function obtenerOrdenesDeUsuario(run, correo) {
  return obtenerOrdenes().filter(
    (o) => (run && o.usuarioRun === run) || (correo && o.cliente.correo === correo)
  );
}

export function crearOrden(datos) {
  const lista = obtenerOrdenes();
  const id = lista.reduce((max, o) => Math.max(max, o.id), 20260000) + 1;
  const orden = {
    estado: 'Pagada',
    usuarioRun: null,
    ...datos,
    id,
    codigoOrden: `ORDER${id}`,
    fecha: new Date().toISOString(),
  };
  guardar(CLAVE, [...lista, orden]);
  return orden;
}

export function actualizarEstadoOrden(id, estado) {
  const lista = obtenerOrdenes();
  const indice = lista.findIndex((o) => String(o.id) === String(id));
  if (indice === -1) return { ok: false, error: 'Orden no encontrada' };
  lista[indice] = { ...lista[indice], estado };
  guardar(CLAVE, lista);
  return { ok: true, orden: lista[indice] };
}

export function eliminarOrden(id) {
  const lista = obtenerOrdenes();
  const nueva = lista.filter((o) => String(o.id) !== String(id));
  if (nueva.length === lista.length) return false;
  guardar(CLAVE, nueva);
  return true;
}