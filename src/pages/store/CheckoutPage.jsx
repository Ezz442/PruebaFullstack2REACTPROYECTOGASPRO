import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../../components/organisms/CheckoutForm.jsx';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';
import { crearOrden } from '../../data/ordenesDB.js';
import { descontarStock } from '../../data/productosDB.js';
import { buscarUsuarioPorRun } from '../../data/usuariosDB.js';
import { formatearPrecio } from '../../utils/formatters.js';

function CheckoutPage() {
  const { items, total, vaciar } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="alert alert-info">
        No hay productos para pagar. <Link to="/productos">Ir a productos</Link>
      </div>
    );
  }

  // Si hay sesión iniciada, los datos del cliente se precargan automáticamente
  const perfil = usuario ? buscarUsuarioPorRun(usuario.run) : null;
  const datosIniciales = perfil
    ? {
        nombre: perfil.nombre,
        apellidos: perfil.apellidos,
        correo: perfil.correo,
        calle: perfil.direccion,
        region: perfil.region,
        comuna: perfil.comuna,
      }
    : {};

  const pagar = (datos) => {
    const exito = datos.metodoPago !== 'rechazado';

    const orden = crearOrden({
      usuarioRun: usuario?.run ?? null,
      cliente: { nombre: datos.nombre, apellidos: datos.apellidos, correo: datos.correo },
      direccion: {
        calle: datos.calle,
        departamento: datos.departamento,
        region: datos.region,
        comuna: datos.comuna,
        indicaciones: datos.indicaciones,
      },
      entrega: datos.entrega,
      metodoPago: datos.metodoPago,
      items: items.map(({ codigo, nombre, precio, cantidad }) => ({ codigo, nombre, precio, cantidad })),
      total,
      estado: exito ? 'Pagada' : 'Pago fallido',
    });

    if (exito) {
      items.forEach((i) => descontarStock(i.codigo, i.cantidad));
      vaciar();
      navigate('/pago-exitoso', { state: { ordenId: orden.id } });
    } else {
      navigate('/pago-error', { state: { ordenId: orden.id } });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-9">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h1 className="h4 mb-0">Carrito de compra</h1>
                <small className="text-muted">Completa la siguiente información</small>
              </div>
              <span className="badge bg-primary fs-6">Total a pagar: {formatearPrecio(total)}</span>
            </div>

            <div className="table-responsive mt-3">
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
                  {items.map((i) => (
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

            <CheckoutForm total={total} datosIniciales={datosIniciales} onSubmit={pagar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;