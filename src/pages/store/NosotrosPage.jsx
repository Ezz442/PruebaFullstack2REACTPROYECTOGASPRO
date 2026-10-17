function NosotrosPage() {
  return (
    <>
      <h1 className="h3 mb-3">Quiénes somos</h1>
      <p>
        GasPro es una distribuidora de gas licuado a domicilio ubicada en Chillán, Región de Ñuble, con
        más de 25 años de trayectoria. Entregamos cilindros, reguladores y accesorios a clientes
        residenciales y comerciales en Chillán y comunas aledañas.
      </p>
      <p>
        Contamos con 2 camiones de reparto, 3 repartidores, una operadora de llamadas y un administrador,
        atendiendo entre 80 y 120 pedidos diarios.
      </p>

      <h2 className="h5 mt-4">Nuestro equipo</h2>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h6 className="mb-0">Matias Humberto Quinchen</h6>
              <small className="text-muted">Administrador</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h6 className="mb-0">Pedro Salazar</h6>
              <small className="text-muted">Operador de despacho</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h6 className="mb-0">Equipo de reparto</h6>
              <small className="text-muted">3 repartidores</small>
            </div>
          </div>
        </div>
      </div>

      <h2 className="h5">Equipo de desarrollo de esta página web</h2>
      <p className="text-muted">Integrantes: Matias Echeverria, Jorge Zarate y Enzo Morales</p>
    </>
  );
}

export default NosotrosPage;