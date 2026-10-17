import { Link, useParams } from 'react-router-dom';
import OrderSummary from '../../components/organisms/OrderSummary.jsx';
import { obtenerOrden } from '../../data/ordenesDB.js';

function AdminBoletaPage() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (!orden) {
    return (
      <div className="alert alert-warning">
        Orden no encontrada. <Link to="/admin/ordenes">Volver a órdenes</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/admin/ordenes" className="btn btn-link px-0 mb-3">
        ← Volver a órdenes
      </Link>
      <OrderSummary orden={orden} exito={orden.estado === 'Pagada'} onPrint={() => window.print()} />
    </>
  );
}

export default AdminBoletaPage;