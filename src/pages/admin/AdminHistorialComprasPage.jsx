import { Link, useParams } from 'react-router-dom';
import Badge from '../../components/atoms/Badge.jsx';
import { buscarUsuarioPorRun } from '../../data/usuariosDB.js';
import { obtenerOrdenesDeUsuario } from '../../data/ordenesDB.js';
import { formatearPrecio, formatearFecha } from '../../utils/formatters.js';

function AdminHistorialComprasPage() {
  const { run } = useParams();
  const usuario = buscarUsuarioPorRun(run);

  if (!usuario) {
    return (
      <div className="alert alert-warning">
        Usuario no encontrado. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  const ordenes = obtenerOrdenesDeUsuario(usuario.run, usuario.correo);

  return (
    <>
      <Link to="/admin/usuarios" className="btn btn-link px-0 mb-2">
        ← Volver a usuarios
      </Link>
      <h1 className="h3">Historial de compras</h1>
      <p className="text-muted">
        {usuario.nombre} {usuario.apellidos} · {usuario.correo}
      </p>

      {ordenes.length === 0 ? (
        <div className="alert alert-info">Este usuario aún no registra compras.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Productos</th>
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
                  <td>{o.items.reduce((s, i) => s + i.cantidad, 0)}</td>
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

export default AdminHistorialComprasPage;