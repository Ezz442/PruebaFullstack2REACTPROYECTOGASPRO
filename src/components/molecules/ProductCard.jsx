import { Link } from 'react-router-dom';
import Button from '../atoms/Button.jsx';
import Price from '../atoms/Price.jsx';
import Badge from '../atoms/Badge.jsx';
import { imagenesProductos } from '../../data/data.js';
import { precioFinal } from '../../data/productosDB.js';

function ProductCard({ producto, onAdd }) {
  const archivo = imagenesProductos[producto.codigo];
  const enOferta = (producto.descuento || 0) > 0;
  const sinStock = producto.stock <= 0;

  return (
    <div className="card h-100 shadow-sm">
      {archivo ? (
        <img
          src={`/img/${archivo}`}
          alt={producto.nombre}
          className="card-img-top img-fluid object-fit-contain p-3"
          style={{ height: '180px' }}
        />
      ) : (
        <div
          className="bg-light d-flex align-items-center justify-content-center text-muted"
          style={{ height: '180px' }}
        >
          Sin imagen
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <small className="text-muted">{producto.categoria}</small>
        <h6 className="card-title">
          <Link to={`/productos/${producto.codigo}`} className="text-decoration-none text-dark">
            {producto.nombre}
          </Link>
        </h6>

        <div className="mb-2">
          <Price
            value={precioFinal(producto)}
            oldValue={enOferta ? producto.precioResidencial : undefined}
          />{' '}
          {enOferta && <Badge text={`-${producto.descuento}%`} variant="danger" />}
        </div>

        <small className="text-muted mb-3">
          {sinStock ? 'Sin stock' : `Stock: ${producto.stock}`}
        </small>

        <Button
          label="Añadir"
          variant="dark"
          className="mt-auto"
          disabled={sinStock}
          onClick={() => onAdd?.(producto)}
        />
      </div>
    </div>
  );
}

export default ProductCard;