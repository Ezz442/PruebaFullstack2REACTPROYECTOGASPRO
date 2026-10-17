import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/organisms/ProductList.jsx';
import FormField from '../../components/molecules/FormField.jsx';
import { useProductos, filtrarProductos } from '../../hooks/useProductos.js';
import { useCart } from '../../hooks/useCart.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';

function ProductosPage() {
  const [params, setParams] = useSearchParams();
  const { productos } = useProductos();
  const { agregar } = useCart();
  const categorias = obtenerCategorias();

  const texto = params.get('q') || '';
  const categoria = params.get('categoria') || '';
  const orden = params.get('orden') || '';

  const cambiar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos);
  };

  const lista = filtrarProductos(productos, { texto, categoria, orden });

  return (
    <>
      <h1 className="h3 mb-3">Productos</h1>

      <div className="row g-2 mb-4">
        <div className="col-12 col-md-5">
          <FormField
            id="q"
            label="Buscar"
            placeholder="Nombre, descripción o código"
            value={texto}
            onChange={(e) => cambiar('q', e.target.value)}
            className="mb-0"
          />
        </div>
        <div className="col-6 col-md-4">
          <FormField
            id="categoria"
            label="Categoría"
            options={[{ value: '', label: 'Todas' }, ...categorias.map((c) => ({ value: c.nombre, label: c.nombre }))]}
            value={categoria}
            onChange={(e) => cambiar('categoria', e.target.value)}
            className="mb-0"
          />
        </div>
        <div className="col-6 col-md-3">
          <FormField
            id="orden"
            label="Ordenar por"
            options={[
              { value: '', label: 'Sin orden' },
              { value: 'precio-asc', label: 'Precio: menor a mayor' },
              { value: 'precio-desc', label: 'Precio: mayor a menor' },
              { value: 'nombre', label: 'Nombre' },
            ]}
            value={orden}
            onChange={(e) => cambiar('orden', e.target.value)}
            className="mb-0"
          />
        </div>
      </div>

      <p className="text-muted small">{lista.length} producto(s) encontrado(s)</p>
      <ProductList productos={lista} onAdd={agregar} mensajeVacio="No hay productos que coincidan con tu búsqueda" />
    </>
  );
}

export default ProductosPage;