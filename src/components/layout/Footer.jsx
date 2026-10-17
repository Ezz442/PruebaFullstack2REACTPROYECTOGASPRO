import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row g-3">
          <div className="col-md-6">
            <h6 className="fw-bold">🔥 GasPro</h6>
            <p className="small mb-0">
              Distribuidora de gas licuado a domicilio en Chillán, Región de Ñuble.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/nosotros" className="text-light me-3">
              Nosotros
            </Link>
            <Link to="/blogs" className="text-light me-3">
              Blogs
            </Link>
            <Link to="/contacto" className="text-light">
              Contacto
            </Link>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="small text-center mb-0">© 2026 GasPro. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;