import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  descontarStock,
  precioFinal,
} from '../data/productosDB.js';
import { instalarLocalStorageMock } from './mocks/localStorageMock.js';

describe('productosDB (CRUD con localStorage simulado)', () => {
  beforeEach(() => {
    instalarLocalStorageMock();
  });

  it('T10 · lee el catálogo inicial de 14 productos', () => {
    expect(obtenerProductos().length).toBe(14);
  });

  it('T10 · crea un producto y luego lo encuentra', () => {
    const resultado = crearProducto({ codigo: 'ZZ001', nombre: 'Prueba', stock: 5, stockCritico: 1, precioResidencial: 1000 });
    expect(resultado.ok).toBeTrue();
    expect(obtenerProducto('ZZ001').nombre).toBe('Prueba');
    expect(obtenerProductos().length).toBe(15);
  });

  it('T10 · rechaza un código duplicado (error)', () => {
    const resultado = crearProducto({ codigo: 'CL001', nombre: 'Repetido' });
    expect(resultado.ok).toBeFalse();
    expect(resultado.error).toBe('Ya existe un producto con ese código');
  });

  it('T10 · actualiza un producto existente y falla con uno inexistente', () => {
    expect(actualizarProducto('CL001', { stock: 7 }).ok).toBeTrue();
    expect(obtenerProducto('CL001').stock).toBe(7);
    expect(actualizarProducto('NOPE', { stock: 1 }).ok).toBeFalse();
  });

  it('T10 · elimina un producto y devuelve false si no existe', () => {
    expect(eliminarProducto('CL001')).toBeTrue();
    expect(obtenerProducto('CL001')).toBeNull();
    expect(eliminarProducto('NOPE')).toBeFalse();
  });

  it('T10 · precioFinal aplica el descuento', () => {
    expect(precioFinal({ precioResidencial: 12000, descuento: 10 })).toBe(10800);
    expect(precioFinal({ precioResidencial: 5000 })).toBe(5000);
  });

  it('T10 · descontarStock resta y nunca deja el stock bajo 0 (borde)', () => {
    descontarStock('CL001', 5);
    expect(obtenerProducto('CL001').stock).toBe(75);
    descontarStock('AC003', 100);
    expect(obtenerProducto('AC003').stock).toBe(0);
  });
});