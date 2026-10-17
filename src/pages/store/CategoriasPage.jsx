import { Link } from 'react-router-dom';
import CategoryCard from '../../components/molecules/CategoryCard.jsx';
import ProductList from '../../components/organisms/ProductList.jsx';
import { useProductos } from '../../hooks/useProductos.js';
import { useCart } from '../../hooks/useCart.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';

function CategoriasPage() {
  const { productos } = useProductos();
  const { agregar } = useCart();
  const categorias = obtenerCategorias();

  return (
    <>
      <h1 className="h3 mb-4">Categorías</h1>

      <div className="row g-3 mb-5">
        {categorias.map((c) => (
          <div key={c.id} className="col-6 col-md-3">
            <CategoryCard categoria={c} />
          </div>
        ))}
      </div>

      {categorias.map((c) => (
        <section key={c.id} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">
              {c.icono} {c.nombre}
            </h2>
            <Link to={`/categorias/${c.id}`} className="btn btn-outline-primary btn-sm">
              Ver categoría
            </Link>
          </div>
          <ProductList
            productos={productos.filter((p) => p.categoria === c.nombre).slice(0, 4)}
            onAdd={agregar}
            mensajeVacio="Aún no hay productos en esta categoría"
          />
        </section>
      ))}
    </>
  );
}

export default CategoriasPage;