import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../context/CartContext.jsx';
import { useCart } from '../hooks/useCart.js';
import { instalarLocalStorageMock } from './mocks/localStorageMock.js';

const cilindro = { codigo: 'CL001', nombre: 'Cilindro GLP 5 kg', precioResidencial: 6500, descuento: 0, stock: 10 };
const regulador = { codigo: 'RG001', nombre: 'Regulador', precioResidencial: 8990, descuento: 0, stock: 10 };

const montar = () =>
  renderHook(() => useCart(), {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
  });

describe('CartContext', () => {
  beforeEach(() => {
    instalarLocalStorageMock();
  });

  it('T08 · agregar el mismo producto aumenta la cantidad y el total', () => {
    const { result } = montar();
    act(() => {
      result.current.agregar(cilindro);
      result.current.agregar(cilindro);
    });
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].cantidad).toBe(2);
    expect(result.current.total).toBe(13000);
  });

  it('T08 · calcula el total con varios productos', () => {
    const { result } = montar();
    act(() => {
      result.current.agregar(cilindro);
      result.current.agregar(regulador, 2);
    });
    expect(result.current.total).toBe(6500 + 8990 * 2);
    expect(result.current.cantidadTotal).toBe(3);
  });

  it('T08 · quitar elimina el producto de la lista', () => {
    const { result } = montar();
    act(() => {
      result.current.agregar(cilindro);
      result.current.agregar(regulador);
    });
    act(() => result.current.quitar('CL001'));
    expect(result.current.items.map((i) => i.codigo)).toEqual(['RG001']);
  });

  it('T08 · con el carrito vacío el total es $0 (borde)', () => {
    const { result } = montar();
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('T08 · no permite superar el stock disponible (borde)', () => {
    const { result } = montar();
    act(() => result.current.agregar(cilindro, 50));
    expect(result.current.items[0].cantidad).toBe(10);
  });

  it('T08 · guarda el carrito en localStorage (mock)', () => {
    const { result } = montar();
    act(() => result.current.agregar(cilindro));
    expect(localStorage.setItem).toHaveBeenCalledWith('gaspro_carrito', jasmine.any(String));
  });
});