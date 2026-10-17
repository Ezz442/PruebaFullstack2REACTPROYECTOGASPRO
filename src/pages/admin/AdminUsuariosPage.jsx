import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/atoms/Badge.jsx';
import Button from '../../components/atoms/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { obtenerUsuarios, eliminarUsuario } from '../../data/usuariosDB.js';

const colorPorTipo = { Administrador: 'danger', Vendedor: 'warning', Cliente: 'secondary' };

function AdminUsuariosPage() {
  const { usuario: sesion } = useAuth();
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());

  const borrar = (u) => {
    if (u.run === sesion?.run) {
      alert('No puedes eliminar tu propia cuenta mientras tienes la sesión abierta.');
      return;
    }
    if (!window.confirm(`¿Eliminar a ${u.nombre} ${u.apellidos}?`)) return;
    eliminarUsuario(u.run);
    setUsuarios(obtenerUsuarios());
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          + Nuevo usuario
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Comuna</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.run}>
                <td>{u.run}</td>
                <td>
                  {u.nombre} {u.apellidos}
                </td>
                <td>{u.correo}</td>
                <td>
                  <Badge text={u.tipo} variant={colorPorTipo[u.tipo] || 'secondary'} />
                </td>
                <td>{u.comuna}</td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/usuarios/${u.run}/historial`} className="btn btn-outline-secondary btn-sm me-1">
                    Historial
                  </Link>
                  <Link to={`/admin/usuarios/${u.run}/editar`} className="btn btn-outline-primary btn-sm me-1">
                    Editar
                  </Link>
                  <Button label="Eliminar" variant="danger" className="btn-sm" onClick={() => borrar(u)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsuariosPage;