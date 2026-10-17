import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from '../molecules/SearchBar.jsx';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';
import { formatearPrecio } from '../../utils/formatters.js';

const claseLink = ({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`;

function Navbar() {
  const { cantidadTotal, total } = useCart();
  const { usuario, esAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbierto, setCategoriasAbierto] = useState(false);
  const categorias = obtenerCategorias();

  const buscar = (texto) => {
    navigate(texto ? `/productos?q=${encodeURIComponent(texto)}` : '/productos');
    setMenuAbierto(false);
  };

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark sticky-top shadow-sm">
      <nav className="navbar navbar-expand-xl navbar-dark container-fluid px-xl-4">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          🔥 GasPro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            <li className="nav-item">
              <NavLink className={claseLink} to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={claseLink} to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link dropdown-toggle"
                aria-expanded={categoriasAbierto}
                onClick={() => setCategoriasAbierto(!categoriasAbierto)}
              >
                Categorías
              </button>
              <ul className={`dropdown-menu dropdown-menu-dark ${categoriasAbierto ? 'show' : ''}`}>
                {categorias.map((c) => (
                  <li key={c.id}>
                    <Link
                      className="dropdown-item"
                      to={`/categorias/${c.id}`}
                      onClick={() => setCategoriasAbierto(false)}
                    >
                      {c.icono} {c.nombre}
                    </Link>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/categorias"
                    onClick={() => setCategoriasAbierto(false)}
                  >
                    Ver todas
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={claseLink} to="/ofertas">
                Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={claseLink} to="/nosotros">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={claseLink} to="/blogs">
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={claseLink} to="/contacto">
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className="me-xl-3 mb-2 mb-xl-0">
            <SearchBar onSearch={buscar} />
          </div>

          <Link to="/carrito" className="btn btn-warning text-nowrap me-xl-2 mb-2 mb-xl-0">
            🛒 Carrito <span>{formatearPrecio(total)}</span>{' '}
            <span className="badge bg-dark ms-1" aria-label="Productos en el carrito">
              {cantidadTotal}
            </span>
          </Link>

          {usuario ? (
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="small text-light">Hola, {usuario.nombre}</span>
              {esAdmin && (
                <Link to="/admin" className="btn btn-outline-light btn-sm text-nowrap">
                  Panel
                </Link>
              )}
              <button
                type="button"
                className="btn btn-outline-light btn-sm text-nowrap"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm text-nowrap">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-warning btn-sm text-nowrap">
                Crear Cuenta
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;