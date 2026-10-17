import { instalarLocalStorageMock } from './mocks/localStorageMock.js';
import { crearProducto, obtenerProductosCriticos } from '../data/productosDB.js';
import { crearOrden, obtenerOrdenes, obtenerOrdenesDeUsuario } from '../data/ordenesDB.js';
import { crearCategoria, eliminarCategoria } from '../data/categoriasDB.js';

describe('Flujos del administrador (datos simulados)', () => {
  beforeEach(() => {
    instalarLocalStorageMock();
  });

  it('un producto con stock bajo el crítico aparece en "Productos críticos"', () => {
    crearProducto({
      codigo: 'TEST01', nombre: 'Producto de prueba', categoria: 'Accesorios',
      precioResidencial: 1000, stock: 2, stockCritico: 5,
    });
    expect(obtenerProductosCriticos().map((p) => p.codigo)).toContain('TEST01');
  });

  it('una compra queda en Órdenes y en el historial del usuario', () => {
    const orden = crearOrden({
      usuarioRun: '201122333',
      cliente: { nombre: 'Fernanda', apellidos: 'Núñez Soto', correo: 'fer.nunez@gmail.com' },
      direccion: {},
      entrega: 'Retiro en tienda',
      metodoPago: 'tarjeta',
      items: [{ codigo: 'CL001', nombre: 'Cilindro GLP 5 kg', precio: 6500, cantidad: 1 }],
      total: 6500,
    });
    expect(obtenerOrdenes().some((o) => o.id === orden.id)).toBeTrue();
    expect(
      obtenerOrdenesDeUsuario('201122333', 'fer.nunez@gmail.com').some((o) => o.id === orden.id)
    ).toBeTrue();
  });

  it('rechaza eliminar una categoría que tiene productos', () => {
    const resultado = eliminarCategoria('cilindros');
    expect(resultado.ok).toBeFalse();
    expect(resultado.error).toContain('hay productos');
  });

  it('permite eliminar una categoría vacía', () => {
    crearCategoria({ nombre: 'Prueba' });
    expect(eliminarCategoria('prueba').ok).toBeTrue();
  });
});