import Button from '../atoms/Button.jsx';
import { formatearPrecio } from '../../utils/formatters.js';
import { imagenesProductos } from '../../data/data.js';

// Fila de la tabla del carrito (se usa dentro de <tbody>)
function CartItem({ item, onChangeCantidad, onRemove }) {
  const archivo = imagenesProductos[item.codigo];

  return (
    <tr>
      <td style={{ width: '70px' }}>
        {archivo && (
          <img
            src={`/img/${archivo}`}
            alt={item.nombre}
            className="img-fluid object-fit-contain"
            style={{ height: '50px' }}
          />
        )}
      </td>
      <td>{item.nombre}</td>
      <td>{formatearPrecio(item.precio)}</td>
      <td>
        <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
          <button
            type="button"
            className="btn btn-outline-secondary"
            aria-label={`Disminuir ${item.nombre}`}
            onClick={() => onChangeCantidad(item.codigo, item.cantidad - 1)}
          >
            −
          </button>
          <span className="form-control text-center">{item.cantidad}</span>
          <button
            type="button"
            className="btn btn-outline-secondary"
            aria-label={`Aumentar ${item.nombre}`}
            onClick={() => onChangeCantidad(item.codigo, item.cantidad + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>{formatearPrecio(item.precio * item.cantidad)}</td>
      <td>
        <Button
          label="Eliminar"
          variant="danger"
          className="btn-sm"
          onClick={() => onRemove(item.codigo)}
        />
      </td>
    </tr>
  );
}

export default CartItem;