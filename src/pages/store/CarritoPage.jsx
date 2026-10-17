import { Link, useNavigate } from 'react-router-dom';
import CartTable from '../../components/organisms/CartTable.jsx';
import Button from '../../components/atoms/Button.jsx';
import { useCart } from '../../hooks/useCart.js';
import { formatearPrecio } from '../../utils/formatters.js';

function CarritoPage() {
  const { items, total, cambiarCantidad, quitar, vaciar } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="h3 mb-4">Carrito de compras</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-9">
          <CartTable
            items={items}
            total={total}
            onChangeCantidad={cambiarCantidad}
            onRemove={quitar}
            onClear={items.length ? vaciar : undefined}
          />
          {items.length === 0 && <Link to="/productos">Ir a ver productos</Link>}
        </div>

        <div className="col-12 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <p className="mb-1 text-muted">Total a pagar</p>
              <p className="fs-3 fw-bold">{formatearPrecio(total)}</p>
              <Button
                label="Comprar ahora"
                variant="success"
                className="w-100"
                disabled={items.length === 0}
                onClick={() => navigate('/checkout')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarritoPage;