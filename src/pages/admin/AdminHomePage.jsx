import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../data/ordenesDB.js';
import { obtenerProductos, obtenerProductosCriticos } from '../../data/productosDB.js';
import { obtenerUsuarios } from '../../data/usuariosDB.js';
import { formatearPrecio } from '../../utils/formatters.js';

const accesos = [
  { to: '/admin/ordenes', icono: '🧾', titulo: 'Órdenes', texto: 'Gestión y seguimiento de las órdenes de compra realizadas.' },
  { to: '/admin/productos', icono: '📦', titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos.' },
  { to: '/admin/categorias', icono: '🏷️', titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar su navegación.' },
  { to: '/admin/usuarios', icono: '👥', titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles.' },
  { to: '/admin/reportes', icono: '📈', titulo: 'Reportes', texto: 'Informes detallados sobre las operaciones del sistema.' },
  { to: '/admin/perfil', icono: '👤', titulo: 'Perfil', texto: 'Administración de tu información personal.' },
  { to: '/', icono: '🏪', titulo: 'Tienda', texto: 'Visualiza tu tienda tal como la ven los clientes.' },
];

function AdminHomePage() {
  const pagadas = obtenerOrdenes().filter((o) => o.estado === 'Pagada');
  const totalVentas = pagadas.reduce((suma, o) => suma + o.total, 0);
  const productos = obtenerProductos();
  const criticos = obtenerProductosCriticos();
  const usuarios = obtenerUsuarios();
  const inventario = productos.reduce((suma, p) => suma + p.stock, 0);

  return (
    <>
      <h1 className="h3">Dashboard</h1>
      <p className="text-muted">Resumen de las actividades diarias</p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h6>Compras</h6>
              <p className="fs-2 mb-0">{pagadas.length}</p>
              <small>Ventas totales: {formatearPrecio(totalVentas)}</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h6>Productos</h6>
              <p className="fs-2 mb-0">{productos.length}</p>
              <small>Inventario actual: {inventario} unidades</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card bg-warning h-100">
            <div className="card-body">
              <h6>Usuarios</h6>
              <p className="fs-2 mb-0">{usuarios.length}</p>
              <small>Cuentas registradas</small>
            </div>
          </div>
        </div>
      </div>

      {criticos.length > 0 && (
        <div className="alert alert-danger">
          ⚠️ Hay {criticos.length} producto(s) con stock crítico.{' '}
          <Link to="/admin/productos/criticos">Ver listado</Link>
        </div>
      )}

      <div className="row g-3">
        {accesos.map((a) => (
          <div key={a.to} className="col-12 col-sm-6 col-xl-3">
            <Link to={a.to} className="card h-100 text-center text-decoration-none shadow-sm">
              <div className="card-body">
                <div style={{ fontSize: '2rem' }}>{a.icono}</div>
                <h6 className="text-dark mt-2">{a.titulo}</h6>
                <p className="small text-muted mb-0">{a.texto}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminHomePage;