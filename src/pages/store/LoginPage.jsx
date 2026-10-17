import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/organisms/LoginForm.jsx';
import { useAuth } from '../../hooks/useAuth.js';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const enviar = (correo, clave) => {
    const resultado = login(correo, clave);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    const esAdmin = ['Administrador', 'Vendedor'].includes(resultado.usuario.tipo);
    navigate(esAdmin ? '/admin' : '/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="h4 mb-3">Iniciar sesión</h1>
            <LoginForm onSubmit={enviar} errorGeneral={error} />
            <p className="small text-center mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;