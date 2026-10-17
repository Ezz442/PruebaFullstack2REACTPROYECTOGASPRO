import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/atoms/Button.jsx';
import Price from '../../components/atoms/Price.jsx';
import Badge from '../../components/atoms/Badge.jsx';
import { useCart } from '../../hooks/useCart.js';
import { obtenerProducto, precioFinal } from '../../data/productosDB.js';
import { imagenesProductos } from '../../data/data.js';
import { formatearPrecio } from '../../utils/formatters.js';

function DetalleProductoPage() {
  const { codigo } = useParams();
  const { agregar } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const producto = obtenerProducto(codigo);

  if (!producto) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado. <Link to="/productos">Volver a productos</Link>
      </div>
    );
  }

  const enOferta = (producto.descuento || 0) > 0;
  const archivo = imagenesProductos[producto.codigo];

  const cambiarCantidad = (valor) => {
    const n = Math.max(1, Math.min(producto.stock, Number(valor) || 1));
    setCantidad(n);
    setAgregado(false);
  };

  const añadir = () => {
    agregar(producto, cantidad);
    setAgregado(true);
  };

  return (
    <>
      <Link to="/productos" className="btn btn-link px-0 mb-3">
        ← Volver a productos
      </Link>

      <div className="row g-4">
        <div className="col-12 col-md-5 text-center">
          {archivo && (
            <img
              src={`/img/${archivo}`}
              alt={producto.nombre}
              className="img-fluid object-fit-contain"
              style={{ maxHeight: '350px' }}
            />
          )}
        </div>

        <div className="col-12 col-md-7">
          <small className="text-muted">{producto.categoria}</small>
          <h1 className="h3">{producto.nombre}</h1>
          <p>{producto.descripcion}</p>

          <p className="fs-4 mb-1">
            <Price
              value={precioFinal(producto)}
              oldValue={enOferta ? producto.precioResidencial : undefined}
            />{' '}
            {enOferta && <Badge text={`-${producto.descuento}%`} variant="danger" />}
          </p>
          <p className="text-muted">
            Precio comercial: {formatearPrecio(producto.precioComercial)} · Unidad: {producto.unidad}
          </p>
          <p>{producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}</p>

          <div className="d-flex align-items-center gap-3 mb-3">
            <label htmlFor="cantidad" className="form-label mb-0">
              Cantidad
            </label>
            <input
              id="cantidad"
              type="number"
              min="1"
              max={producto.stock}
              className="form-control"
              style={{ maxWidth: '100px' }}
              value={cantidad}
              onChange={(e) => cambiarCantidad(e.target.value)}
            />
            <Button label="Añadir al carrito" variant="success" onClick={añadir} disabled={producto.stock <= 0} />
          </div>

          {agregado && (
            <div className="alert alert-success">
              Producto agregado. <Link to="/carrito">Ver carrito</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DetalleProductoPage;