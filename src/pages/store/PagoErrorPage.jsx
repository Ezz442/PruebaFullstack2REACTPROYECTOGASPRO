import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/organisms/OrderSummary.jsx';
import { obtenerOrden, obtenerUltimaOrden } from '../../data/ordenesDB.js';

function PagoErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.ordenId;
  const orden = (id != null ? obtenerOrden(id) : null) || obtenerUltimaOrden();

  if (!orden) {
    return <div className="alert alert-warning">No hay una orden para mostrar.</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-9">
        <OrderSummary orden={orden} exito={false} onRetry={() => navigate('/checkout')} />
      </div>
    </div>
  );
}

export default PagoErrorPage;