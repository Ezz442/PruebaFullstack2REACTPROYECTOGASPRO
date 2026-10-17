import { Link, useParams } from 'react-router-dom';
import { obtenerBlog } from '../../data/blogsDB.js';

function BlogDetallePage() {
  const { id } = useParams();
  const blog = obtenerBlog(id);

  if (!blog) {
    return (
      <div className="alert alert-warning">
        Artículo no encontrado. <Link to="/blogs">Volver a blogs</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto" style={{ maxWidth: '760px' }}>
      <Link to="/blogs" className="btn btn-link px-0 mb-3">
        ← Volver a Blogs
      </Link>
      <h1 className="h3">
        {blog.titulo} {blog.icono}
      </h1>
      {blog.contenido.map((parrafo) => (
        <p key={parrafo.slice(0, 30)}>{parrafo}</p>
      ))}
    </article>
  );
}

export default BlogDetallePage;