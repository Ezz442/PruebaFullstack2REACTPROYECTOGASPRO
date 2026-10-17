import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/atoms/Badge.jsx';
import Button from '../../components/atoms/Button.jsx';
import { useProductos, filtrarProductos } from '../../hooks/useProductos.js';
import { formatearPrecio } from '../../utils/formatters.js';

function AdminProductosPage() {
  const { productos, eliminar } = useProductos();
  const [texto, setTexto] = useState('');

  const lista = filtrarProductos(productos, { texto });

  const borrar = (p) => {
    if (window.confirm(`¿Eliminar "${p.nombre}"?`)) eliminar(p.codigo);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h1 className="h3 mb-0">Productos</h1>
        <div className="d-flex gap-2">
          <Link to="/admin/productos/criticos" className="btn btn-outline-danger">
            Productos críticos
          </Link>
          <Link to="/admin/productos/reportes" className="btn btn-outline-secondary">
            Reportes
          </Link>
          <Link to="/admin/productos/nuevo" className="btn btn-primary">
            + Nuevo producto
          </Link>
        </div>
      </div>

      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por nombre, descripción o código"
        aria-label="Buscar producto"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearPrecio(p.precioResidencial)}</td>
                <td>
                  {p.stock}{' '}
                  {p.stock <= p.stockCritico && <Badge text="Crítico" variant="danger" />}
                </td>
                <td className="text-end">
                  <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-outline-primary btn-sm me-2">
                    Editar
                  </Link>
                  <Button label="Eliminar" variant="danger" className="btn-sm" onClick={() => borrar(p)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lista.length === 0 && <p className="text-center text-muted">No se encontraron productos.</p>}
      </div>
    </>
  );
}

export default AdminProductosPage;