import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/organisms/RegistrationForm.jsx';
import { useAuth } from '../../hooks/useAuth.js';

function RegistroPage() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const enviar = (datos) => {
    const resultado = registrar(datos);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="h4 mb-3">Crear cuenta</h1>
            <RegistrationForm onSubmit={enviar} errorGeneral={error} />
            <p className="small text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroPage;