import { Link } from 'react-router-dom';

function CategoryCard({ categoria }) {
  return (
    <Link
      to={`/categorias/${categoria.id}`}
      className="card h-100 text-center text-decoration-none shadow-sm"
    >
      <div className="card-body">
        <div style={{ fontSize: '2.5rem' }}>{categoria.icono}</div>
        <h6 className="card-title text-dark mt-2">{categoria.nombre}</h6>
        <p className="card-text small text-muted">{categoria.descripcion}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;