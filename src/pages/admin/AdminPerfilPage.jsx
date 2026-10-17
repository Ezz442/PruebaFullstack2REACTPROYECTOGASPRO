import { useState } from 'react';
import FormField from '../../components/molecules/FormField.jsx';
import Button from '../../components/atoms/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { buscarUsuarioPorRun } from '../../data/usuariosDB.js';
import { validarObligatorio } from '../../utils/validations.js';

function AdminPerfilPage() {
  const { usuario, actualizarPerfil } = useAuth();
  const perfil = buscarUsuarioPorRun(usuario.run);

  const [form, setForm] = useState({
    nombre: perfil?.nombre || '',
    apellidos: perfil?.apellidos || '',
    direccion: perfil?.direccion || '',
  });
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  const cambiar = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setGuardado(false);
  };

  const guardar = (ev) => {
    ev.preventDefault();
    const nuevos = {};
    if (!validarObligatorio(form.nombre)) nuevos.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(form.apellidos)) nuevos.apellidos = 'Los apellidos son obligatorios';
    if (!validarObligatorio(form.direccion)) nuevos.direccion = 'La dirección es obligatoria';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const resultado = actualizarPerfil(form);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    setErrorGeneral('');
    setGuardado(true);
  };

  return (
    <>
      <h1 className="h3 mb-3">Mi perfil</h1>
      <form onSubmit={guardar} noValidate className="card card-body shadow-sm" style={{ maxWidth: '600px' }}>
        <ErrorMessage message={errorGeneral} />
        {guardado && <div className="alert alert-success">Perfil actualizado correctamente.</div>}

        <div className="row">
          <div className="col-md-6">
            <FormField id="run" label="RUN" value={usuario.run} disabled readOnly />
          </div>
          <div className="col-md-6">
            <FormField id="tipo" label="Tipo de usuario" value={usuario.tipo} disabled readOnly />
          </div>
        </div>
        <FormField id="correo" label="Correo" value={usuario.correo} disabled readOnly />
        <FormField id="nombre" label="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} required />
        <FormField id="apellidos" label="Apellidos" value={form.apellidos} onChange={cambiar} error={errores.apellidos} required />
        <FormField id="direccion" label="Dirección" value={form.direccion} onChange={cambiar} error={errores.direccion} required />

        <div>
          <Button label="Guardar cambios" type="submit" />
        </div>
      </form>
    </>
  );
}

export default AdminPerfilPage;