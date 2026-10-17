import { leer, guardar } from './storage.js';
import { productosSeed } from './data.js';

const CLAVE = 'gaspro_productos';

// ----- READ -----
export function obtenerProductos() {
  return leer(CLAVE, productosSeed);
}

export function obtenerProducto(codigo) {
  return obtenerProductos().find((p) => p.codigo === codigo) || null;
}

export function obtenerProductosCriticos() {
  return obtenerProductos().filter((p) => p.stock <= p.stockCritico);
}

export function obtenerProductosEnOferta() {
  return obtenerProductos().filter((p) => (p.descuento || 0) > 0);
}

// Precio final con descuento aplicado
export function precioFinal(producto) {
  const base = producto.precioResidencial ?? producto.precio ?? 0;
  const descuento = producto.descuento || 0;
  return Math.round((base * (100 - descuento)) / 100);
}

// ----- CREATE -----
export function crearProducto(producto) {
  const lista = obtenerProductos();
  if (lista.some((p) => p.codigo === producto.codigo)) {
    return { ok: false, error: 'Ya existe un producto con ese código' };
  }
  const nuevo = { descuento: 0, ...producto };
  guardar(CLAVE, [...lista, nuevo]);
  return { ok: true, producto: nuevo };
}

// ----- UPDATE -----
export function actualizarProducto(codigo, cambios) {
  const lista = obtenerProductos();
  const indice = lista.findIndex((p) => p.codigo === codigo);
  if (indice === -1) return { ok: false, error: 'Producto no encontrado' };
  lista[indice] = { ...lista[indice], ...cambios, codigo };
  guardar(CLAVE, lista);
  return { ok: true, producto: lista[indice] };
}

export function descontarStock(codigo, cantidad) {
  const producto = obtenerProducto(codigo);
  if (!producto) return { ok: false, error: 'Producto no encontrado' };
  return actualizarProducto(codigo, { stock: Math.max(0, producto.stock - cantidad) });
}

export function renombrarCategoriaEnProductos(anterior, nueva) {
  const lista = obtenerProductos().map((p) =>
    p.categoria === anterior ? { ...p, categoria: nueva } : p
  );
  guardar(CLAVE, lista);
}

// ----- DELETE -----
export function eliminarProducto(codigo) {
  const lista = obtenerProductos();
  const nueva = lista.filter((p) => p.codigo !== codigo);
  if (nueva.length === lista.length) return false;
  guardar(CLAVE, nueva);
  return true;
}