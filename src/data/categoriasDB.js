import { leer, guardar } from './storage.js';
import { categoriasSeed } from './data.js';
import { obtenerProductos, renombrarCategoriaEnProductos } from './productosDB.js';

const CLAVE = 'gaspro_categorias';

const crearId = (nombre) =>
  nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function obtenerCategorias() {
  return leer(CLAVE, categoriasSeed);
}

export function obtenerCategoria(id) {
  return obtenerCategorias().find((c) => c.id === id) || null;
}

export function crearCategoria({ nombre, descripcion = '', icono = '📦' }) {
  const id = crearId(nombre);
  if (!id) return { ok: false, error: 'El nombre no es válido' };
  if (obtenerCategoria(id)) return { ok: false, error: 'Ya existe una categoría con ese nombre' };
  const nueva = { id, nombre, descripcion, icono };
  guardar(CLAVE, [...obtenerCategorias(), nueva]);
  return { ok: true, categoria: nueva };
}

export function actualizarCategoria(id, cambios) {
  const lista = obtenerCategorias();
  const indice = lista.findIndex((c) => c.id === id);
  if (indice === -1) return { ok: false, error: 'Categoría no encontrada' };
  const anterior = lista[indice];
  lista[indice] = { ...anterior, ...cambios, id };
  guardar(CLAVE, lista);
  if (cambios.nombre && cambios.nombre !== anterior.nombre) {
    renombrarCategoriaEnProductos(anterior.nombre, cambios.nombre);
  }
  return { ok: true, categoria: lista[indice] };
}

export function eliminarCategoria(id) {
  const categoria = obtenerCategoria(id);
  if (!categoria) return { ok: false, error: 'Categoría no encontrada' };
  if (obtenerProductos().some((p) => p.categoria === categoria.nombre)) {
    return { ok: false, error: 'No se puede eliminar: hay productos en esta categoría' };
  }
  guardar(CLAVE, obtenerCategorias().filter((c) => c.id !== id));
  return { ok: true };
}