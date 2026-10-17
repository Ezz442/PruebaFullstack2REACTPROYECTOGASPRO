import { Link, useParams } from 'react-router-dom';
import ProductList from '../../components/organisms/ProductList.jsx';
import { useProductos } from '../../hooks/useProductos.js';
import { useCart } from '../../hooks/useCart.js';
import { obtenerCategoria } from '../../data/categoriasDB.js';

function CategoriaDetallePage() {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregar } = useCart();
  const categoria = obtenerCategoria(id);

  if (!categoria) {
    return (
      <div className="alert alert-warning">
        Categoría no encontrada. <Link to="/categorias">Ver categorías</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/categorias" className="btn btn-link px-0 mb-2">
        ← Todas las categorías
      </Link>
      <h1 className="h3">
        {categoria.icono} {categoria.nombre}
      </h1>
      <p className="text-muted mb-4">{categoria.descripcion}</p>
      <ProductList
        productos={productos.filter((p) => p.categoria === categoria.nombre)}
        onAdd={agregar}
        mensajeVacio="Aún no hay productos en esta categoría"
      />
    </>
  );
}

export default CategoriaDetallePage;