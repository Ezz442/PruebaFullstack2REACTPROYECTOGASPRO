import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel.jsx';
import CategoryCard from '../../components/molecules/CategoryCard.jsx';
import ProductList from '../../components/organisms/ProductList.jsx';
import { useProductos } from '../../hooks/useProductos.js';
import { useCart } from '../../hooks/useCart.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';
import { zonas } from '../../data/data.js';

const slides = [
  { titulo: 'Gas a domicilio en Chillán', texto: 'Cilindros, reguladores y accesorios con despacho rápido', fondo: 'dark' },
  { titulo: 'Ofertas de la semana', texto: 'Descuentos en cilindros, reguladores y kits de conexión', fondo: 'warning' },
  { titulo: 'Seguridad primero', texto: 'Revisa nuestros consejos en el blog', fondo: 'danger' },
];

function HomePage() {
  const { productos } = useProductos();
  const { agregar } = useCart();
  const categorias = obtenerCategorias();

  return (
    <>
      <Carousel slides={slides} />

      <section className="my-5">
        <h2 className="text-center mb-4">Categorías</h2>
        <div className="row g-3 justify-content-center">
          {categorias.map((c) => (
            <div key={c.id} className="col-6 col-md-3">
              <CategoryCard categoria={c} />
            </div>
          ))}
        </div>
      </section>

      <section className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Productos destacados</h2>
          <Link to="/productos" className="btn btn-outline-primary btn-sm">
            Ver todos
          </Link>
        </div>
        <ProductList productos={productos.slice(0, 4)} onAdd={agregar} />
      </section>

      <section className="my-5">
        <h2 className="h4 mb-3">Zonas de despacho</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Zona</th>
                <th>Comunas</th>
                <th>Días</th>
                <th>Horario</th>
                <th>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {zonas.map((z) => (
                <tr key={z.zona}>
                  <td>{z.zona}</td>
                  <td>{z.comunas}</td>
                  <td>{z.dias}</td>
                  <td>{z.horario}</td>
                  <td>{z.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default HomePage;