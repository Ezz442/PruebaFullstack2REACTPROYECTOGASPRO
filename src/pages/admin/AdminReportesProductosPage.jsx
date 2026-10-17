import { Link } from 'react-router-dom';
import { obtenerProductos, obtenerProductosCriticos } from '../../data/productosDB.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';
import { formatearPrecio } from '../../utils/formatters.js';

function AdminReportesProductosPage() {
  const productos = obtenerProductos();
  const criticos = obtenerProductosCriticos();
  const categorias = obtenerCategorias();

  const filas = categorias.map((c) => {
    const delaCategoria = productos.filter((p) => p.categoria === c.nombre);
    return {
      id: c.id,
      nombre: c.nombre,
      cantidad: delaCategoria.length,
      unidades: delaCategoria.reduce((s, p) => s + p.stock, 0),
      valor: delaCategoria.reduce((s, p) => s + p.stock * p.precioResidencial, 0),
    };
  });
  const valorTotal = filas.reduce((s, f) => s + f.valor, 0);

  return (
    <>
      <Link to="/admin/productos" className="btn btn-link px-0 mb-2">
        ← Volver a productos
      </Link>
      <h1 className="h3 mb-3">Reportes de productos</h1>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <p className="mb-0 text-muted small">Productos</p>
              <p className="fs-3 mb-0">{productos.length}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <p className="mb-0 text-muted small">Stock crítico</p>
              <p className="fs-3 mb-0 text-danger">{criticos.length}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <p className="mb-0 text-muted small">Valor del inventario</p>
              <p className="fs-3 mb-0">{formatearPrecio(valorTotal)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Productos</th>
              <th>Unidades en stock</th>
              <th>Valor inventario</th>
              <th style={{ minWidth: '160px' }}>% del total</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => {
              const porcentaje = valorTotal ? Math.round((f.valor / valorTotal) * 100) : 0;
              return (
                <tr key={f.id}>
                  <td>{f.nombre}</td>
                  <td>{f.cantidad}</td>
                  <td>{f.unidades}</td>
                  <td>{formatearPrecio(f.valor)}</td>
                  <td>
                    <div className="progress" role="progressbar" aria-label={`Porcentaje ${f.nombre}`}>
                      <div className="progress-bar" style={{ width: `${porcentaje}%` }}>
                        {porcentaje}%
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminReportesProductosPage;