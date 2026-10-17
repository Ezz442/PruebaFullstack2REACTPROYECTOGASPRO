import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const secciones = [
  { to: '/admin', texto: 'Dashboard', icono: '📊', end: true },
  { to: '/admin/ordenes', texto: 'Órdenes', icono: '🧾' },
  { to: '/admin/productos', texto: 'Productos', icono: '📦' },
  { to: '/admin/categorias', texto: 'Categorías', icono: '🏷️' },
  { to: '/admin/usuarios', texto: 'Usuarios', icono: '👥' },
  { to: '/admin/reportes', texto: 'Reportes', icono: '📈' },
];

const claseLink = ({ isActive }) =>
  `list-group-item list-group-item-action ${isActive ? 'active' : ''}`;

function AdminSidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h5 className="fw-bold mb-1">GasPro Admin</h5>
      <p className="small text-muted mb-3">
        {usuario?.nombre} · {usuario?.tipo}
      </p>

      <div className="list-group mb-3">
        {secciones.map((s) => (
          <NavLink key={s.to} to={s.to} end={s.end} className={claseLink}>
            {s.icono} {s.texto}
          </NavLink>
        ))}
      </div>

      <div className="list-group mb-3">
        <NavLink to="/admin/perfil" className={claseLink}>
          👤 Perfil
        </NavLink>
      </div>

      <div className="d-grid gap-2">
        <Link to="/" className="btn btn-dark btn-sm">
          🏪 Tienda
        </Link>
        <button type="button" className="btn btn-danger btn-sm" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;