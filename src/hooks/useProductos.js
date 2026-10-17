import { useCallback, useState } from 'react';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  precioFinal,
} from '../data/productosDB.js';

// Filtros de búsqueda: texto, categoría y orden
export function filtrarProductos(productos, { texto = '', categoria = '', orden = '' } = {}) {
  const t = texto.trim().toLowerCase();
  let lista = productos.filter((p) => {
    const coincideTexto =
      !t ||
      p.nombre.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t) ||
      p.codigo.toLowerCase().includes(t);
    const coincideCategoria = !categoria || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  if (orden === 'precio-asc') lista = [...lista].sort((a, b) => precioFinal(a) - precioFinal(b));
  if (orden === 'precio-desc') lista = [...lista].sort((a, b) => precioFinal(b) - precioFinal(a));
  if (orden === 'nombre') lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
  return lista;
}

// Conecta la "base de datos" simulada con los componentes (estado en tiempo real)
export function useProductos() {
  const [productos, setProductos] = useState(() => obtenerProductos());

  const recargar = useCallback(() => setProductos(obtenerProductos()), []);

  const crear = useCallback(
    (producto) => {
      const resultado = crearProducto(producto);
      recargar();
      return resultado;
    },
    [recargar]
  );

  const actualizar = useCallback(
    (codigo, cambios) => {
      const resultado = actualizarProducto(codigo, cambios);
      recargar();
      return resultado;
    },
    [recargar]
  );

  const eliminar = useCallback(
    (codigo) => {
      const resultado = eliminarProducto(codigo);
      recargar();
      return resultado;
    },
    [recargar]
  );

  return { productos, recargar, crear, actualizar, eliminar };
}