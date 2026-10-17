import { Link } from 'react-router-dom';
import { obtenerBlogs } from '../../data/blogsDB.js';

function BlogsPage() {
  const blogs = obtenerBlogs();

  return (
    <>
      <h1 className="h3 text-center mb-4">Noticias importantes</h1>
      <div className="row g-4">
        {blogs.map((b) => (
          <div key={b.id} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="text-center pt-3" style={{ fontSize: '3rem' }}>
                {b.icono}
              </div>
              <div className="card-body">
                <h5 className="fw-bold">{b.titulo}</h5>
                <p className="text-muted">{b.resumen}</p>
                <Link to={`/blogs/${b.id}`} className="btn btn-outline-secondary btn-sm">
                  Ver caso
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogsPage;