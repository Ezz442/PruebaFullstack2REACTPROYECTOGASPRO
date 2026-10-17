import { Link, useLocation } from 'react-router-dom';
import OrderSummary from '../../components/organisms/OrderSummary.jsx';
import { obtenerOrden, obtenerUltimaOrden } from '../../data/ordenesDB.js';

function PagoCorrectoPage() {
  const location = useLocation();
  const id = location.state?.ordenId;
  const orden = (id != null ? obtenerOrden(id) : null) || obtenerUltimaOrden();

  if (!orden) {
    return <div className="alert alert-warning">No hay una orden para mostrar.</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-9">
        <OrderSummary
          orden={orden}
          exito
          onPrint={() => window.print()}
          onEmail={() => alert(`Boleta enviada a ${orden.cliente.correo} (simulado)`)}
        />
        <div className="text-center mt-3">
          <Link to="/productos" className="btn btn-outline-primary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PagoCorrectoPage;