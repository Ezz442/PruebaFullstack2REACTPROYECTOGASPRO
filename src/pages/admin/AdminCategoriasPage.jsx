import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/atoms/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { obtenerCategorias, eliminarCategoria } from '../../data/categoriasDB.js';
import { obtenerProductos } from '../../data/productosDB.js';

function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState(() => obtenerCategorias());
  const [error, setError] = useState('');
  const productos = obtenerProductos();

  const borrar = (c) => {
    if (!window.confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
    const resultado = eliminarCategoria(c.id);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    setError('');
    setCategorias(obtenerCategorias());
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn btn-primary">
          + Nueva categoría
        </Link>
      </div>

      <ErrorMessage message={error} />

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th />
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Productos</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td style={{ fontSize: '1.5rem' }}>{c.icono}</td>
                <td>{c.nombre}</td>
                <td>{c.descripcion}</td>
                <td>{productos.filter((p) => p.categoria === c.nombre).length}</td>
                <td className="text-end">
                  <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-outline-primary btn-sm me-2">
                    Editar
                  </Link>
                  <Button label="Eliminar" variant="danger" className="btn-sm" onClick={() => borrar(c)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminCategoriasPage;