import { Link } from 'react-router-dom';
import Badge from '../../components/atoms/Badge.jsx';
import { obtenerOrdenes } from '../../data/ordenesDB.js';
import { formatearPrecio, formatearFecha } from '../../utils/formatters.js';

function AdminOrdenesPage() {
  const ordenes = [...obtenerOrdenes()].reverse(); // las más recientes primero

  return (
    <>
      <h1 className="h3 mb-3">Órdenes / Boletas</h1>

      {ordenes.length === 0 ? (
        <div className="alert alert-info">Aún no hay órdenes registradas.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>
                    {o.cliente.nombre} {o.cliente.apellidos}
                  </td>
                  <td>{formatearPrecio(o.total)}</td>
                  <td>
                    <Badge text={o.estado} variant={o.estado === 'Pagada' ? 'success' : 'danger'} />
                  </td>
                  <td className="text-end">
                    <Link to={`/admin/ordenes/${o.id}`} className="btn btn-outline-primary btn-sm">
                      Ver boleta
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

export default AdminOrdenesPage;