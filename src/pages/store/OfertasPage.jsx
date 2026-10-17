import ProductList from '../../components/organisms/ProductList.jsx';
import { useProductos } from '../../hooks/useProductos.js';
import { useCart } from '../../hooks/useCart.js';

function OfertasPage() {
  const { productos } = useProductos();
  const { agregar } = useCart();
  const ofertas = productos.filter((p) => (p.descuento || 0) > 0);

  return (
    <>
      <h1 className="h3 mb-4">🔥 Ofertas</h1>
      <ProductList productos={ofertas} onAdd={agregar} mensajeVacio="No hay productos en oferta por ahora" />
    </>
  );
}

export default OfertasPage;