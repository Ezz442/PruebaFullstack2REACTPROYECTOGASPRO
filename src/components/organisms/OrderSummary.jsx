import Button from '../atoms/Button.jsx';
import { formatearPrecio, formatearFecha } from '../../utils/formatters.js';

// Resumen de una orden. Los botones solo aparecen si se pasa su función.
function OrderSummary({ orden, exito = true, onRetry, onPrint, onEmail }) {
  const { cliente, direccion } = orden;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between flex-wrap mb-3">
          <h2 className={`h4 ${exito ? 'text-success' : 'text-danger'}`}>
            {exito ? '✔ Se ha realizado la compra.' : '✖ No se pudo realizar el pago.'} nro #{orden.id}
          </h2>
          <small className="text-muted">
            Código orden: {orden.codigoOrden} · {formatearFecha(orden.fecha)}
          </small>
        </div>

        {!exito && onRetry && (
          <div className="text-center mb-3">
            <Button label="VOLVER A REALIZAR EL PAGO" variant="success" onClick={onRetry} />
          </div>
        )}

        <h6>Cliente</h6>
        <p className="mb-3">
          {cliente.nombre} {cliente.apellidos} · {cliente.correo}
        </p>

        <h6>Entrega</h6>
        <p className="mb-3">
          {orden.entrega}
          {orden.entrega === 'Despacho a domicilio' && (
            <>
              <br />
              {direccion.calle}
              {direccion.departamento ? `, Depto ${direccion.departamento}` : ''} — {direccion.comuna},{' '}
              {direccion.region}
              {direccion.indicaciones && (
                <>
                  <br />
                  <small className="text-muted">{direccion.indicaciones}</small>
                </>
              )}
            </>
          )}
        </p>

        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((i) => (
                <tr key={i.codigo}>
                  <td>{i.nombre}</td>
                  <td>{formatearPrecio(i.precio)}</td>
                  <td>{i.cantidad}</td>
                  <td>{formatearPrecio(i.precio * i.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="alert alert-light border text-center fs-5 fw-bold">
          {exito ? 'Total pagado' : 'Total a pagar'}: {formatearPrecio(orden.total)}
        </div>

        <div className="d-flex gap-2 justify-content-center">
          {onPrint && <Button label="Imprimir boleta en PDF" variant="danger" onClick={onPrint} />}
          {onEmail && <Button label="Enviar boleta por email" variant="success" onClick={onEmail} />}
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;