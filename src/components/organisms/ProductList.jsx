import ProductCard from '../molecules/ProductCard.jsx';

function ProductList({ productos, onAdd, mensajeVacio = 'No hay productos para mostrar' }) {
  if (!productos || productos.length === 0) {
    return <p className="text-center text-muted my-4">{mensajeVacio}</p>;
  }

  return (
    <div className="row g-4">
      {productos.map((p) => (
        <div key={p.codigo} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ProductCard producto={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;