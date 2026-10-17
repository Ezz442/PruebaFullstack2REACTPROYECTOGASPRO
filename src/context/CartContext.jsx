/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { leer, guardar } from '../data/storage.js';
import { precioFinal } from '../data/productosDB.js';

export const CartContext = createContext(null);

const CLAVE = 'gaspro_carrito';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => leer(CLAVE, []));

  // Persistencia: cada cambio del carrito se guarda en localStorage
  useEffect(() => {
    guardar(CLAVE, items);
  }, [items]);

  const agregar = useCallback((producto, cantidad = 1) => {
    const stock = producto.stock ?? Infinity;
    setItems((prev) => {
      const existente = prev.find((i) => i.codigo === producto.codigo);
      if (existente) {
        return prev.map((i) =>
          i.codigo === producto.codigo
            ? { ...i, cantidad: Math.min(i.cantidad + cantidad, stock) }
            : i
        );
      }
      return [
        ...prev,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: precioFinal(producto),
          cantidad: Math.min(cantidad, stock),
          stock: producto.stock,
        },
      ];
    });
  }, []);

  const quitar = useCallback((codigo) => {
    setItems((prev) => prev.filter((i) => i.codigo !== codigo));
  }, []);

  const cambiarCantidad = useCallback((codigo, cantidad) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.codigo !== codigo)
        : prev.map((i) =>
            i.codigo === codigo ? { ...i, cantidad: Math.min(cantidad, i.stock ?? Infinity) } : i
          )
    );
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      total: items.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
      cantidadTotal: items.reduce((suma, i) => suma + i.cantidad, 0),
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
    }),
    [items, agregar, quitar, cambiarCantidad, vaciar]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}