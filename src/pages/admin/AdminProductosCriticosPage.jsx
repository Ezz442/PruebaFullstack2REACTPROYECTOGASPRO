import { Link } from 'react-router-dom';
import Badge from '../../components/atoms/Badge.jsx';
import { obtenerProductosCriticos } from '../../data/productosDB.js';

function AdminProductosCriticosPage() {
  const criticos = obtenerProductosCriticos();

  return (
    <>
      <Link to="/admin/productos" className="btn btn-link px-0 mb-2">
        ← Volver a productos
      </Link>
      <h1 className="h3 mb-3">Listado de productos críticos</h1>
      <p className="text-muted">Productos cuyo stock es igual o menor al stock crítico definido.</p>

      {criticos.length === 0 ? (
        <div className="alert alert-success">No hay productos con stock crítico. ✔</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Stock crítico</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {criticos.map((p) => (
                <tr key={p.codigo}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>
                    <Badge text={p.stock} variant="danger" />
                  </td>
                  <td>{p.stockCritico}</td>
                  <td className="text-end">
                    <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-outline-primary btn-sm">
                      Reponer stock
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdminProductosCriticosPage;