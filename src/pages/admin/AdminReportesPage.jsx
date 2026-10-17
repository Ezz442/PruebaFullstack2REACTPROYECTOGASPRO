import { obtenerOrdenes } from '../../data/ordenesDB.js';
import { obtenerUsuarios } from '../../data/usuariosDB.js';
import { formatearPrecio } from '../../utils/formatters.js';

function AdminReportesPage() {
  const ordenes = obtenerOrdenes();
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');
  const fallidas = ordenes.length - pagadas.length;
  const totalVentas = pagadas.reduce((s, o) => s + o.total, 0);
  const ticketPromedio = pagadas.length ? totalVentas / pagadas.length : 0;

  // Ranking de productos más vendidos (solo órdenes pagadas)
  const ranking = {};
  pagadas.forEach((o) =>
    o.items.forEach((i) => {
      ranking[i.codigo] = ranking[i.codigo] || { nombre: i.nombre, unidades: 0, monto: 0 };
      ranking[i.codigo].unidades += i.cantidad;
      ranking[i.codigo].monto += i.precio * i.cantidad;
    })
  );
  const top = Object.entries(ranking)
    .map(([codigo, v]) => ({ codigo, ...v }))
    .sort((a, b) => b.unidades - a.unidades)
    .slice(0, 5);

  const usuarios = obtenerUsuarios();
  const porTipo = ['Administrador', 'Vendedor', 'Cliente'].map((tipo) => ({
    tipo,
    cantidad: usuarios.filter((u) => u.tipo === tipo).length,
  }));

  return (
    <>
      <h1 className="h3 mb-3">Reportes</h1>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <p className="small text-muted mb-0">Ventas totales</p>
              <p className="fs-4 mb-0">{formatearPrecio(totalVentas)}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <p className="small text-muted mb-0">Órdenes pagadas</p>
              <p className="fs-4 mb-0">{pagadas.length}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <p className="small text-muted mb-0">Pagos fallidos</p>
              <p className="fs-4 mb-0 text-danger">{fallidas}</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <p className="small text-muted mb-0">Ticket promedio</p>
              <p className="fs-4 mb-0">{formatearPrecio(ticketPromedio)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <h2 className="h5">Productos más vendidos</h2>
          {top.length === 0 ? (
            <div className="alert alert-info">Aún no hay ventas registradas.</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Unidades</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {top.map((t) => (
                    <tr key={t.codigo}>
                      <td>{t.nombre}</td>
                      <td>{t.unidades}</td>
                      <td>{formatearPrecio(t.monto)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="col-12 col-lg-4">
          <h2 className="h5">Usuarios por tipo</h2>
          <ul className="list-group">
            {porTipo.map((t) => (
              <li key={t.tipo} className="list-group-item d-flex justify-content-between">
                {t.tipo}
                <span className="badge bg-primary">{t.cantidad}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminReportesPage;