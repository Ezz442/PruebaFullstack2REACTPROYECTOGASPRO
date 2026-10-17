import CartItem from '../molecules/CartItem.jsx';
import Button from '../atoms/Button.jsx';
import { formatearPrecio } from '../../utils/formatters.js';

function CartTable({ items, total, onChangeCantidad, onRemove, onClear }) {
  if (items.length === 0) {
    return <div className="alert alert-info">Tu carrito está vacío</div>;
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem
                key={item.codigo}
                item={item}
                onChangeCantidad={onChangeCantidad}
                onRemove={onRemove}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Total
              </td>
              <td className="fw-bold">{formatearPrecio(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
      {onClear && <Button label="Limpiar" variant="secondary" onClick={onClear} />}
    </div>
  );
}

export default CartTable;