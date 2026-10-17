import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

// Protege rutas por sesión y por rol (ex exigirSesionAdmin del proyecto HTML)
function ProtectedRoute({ roles, children }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(usuario.tipo)) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;