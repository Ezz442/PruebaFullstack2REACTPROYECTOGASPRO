import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/molecules/FormField.jsx';
import Button from '../../components/atoms/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { buscarUsuarioPorRun, registrarUsuario, actualizarUsuario } from '../../data/usuariosDB.js';
import { regiones } from '../../data/data.js';
import { validarCorreo, validarRut, validarClave, validarObligatorio } from '../../utils/validations.js';

const REGION_INICIAL = Object.keys(regiones)[0];

const VACIO = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  tipo: 'Cliente',
  region: REGION_INICIAL,
  comuna: regiones[REGION_INICIAL][0],
  direccion: '',
};

function AdminUsuarioFormPage() {
  const { run } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(run);
  const existente = editando ? buscarUsuarioPorRun(run) : null;

  const [form, setForm] = useState(() => existente || VACIO);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (editando && !existente) {
    return (
      <div className="alert alert-warning">
        Usuario no encontrado. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) =>
      name === 'region'
        ? { ...prev, region: value, comuna: regiones[value][0] }
        : { ...prev, [name]: value }
    );
  };

  const validar = () => {
    const e = {};
    if (!editando && !validarRut(form.run)) e.run = 'RUN inválido (sin puntos ni guion, ej: 19011022K)';
    if (!validarObligatorio(form.nombre)) e.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(form.apellidos)) e.apellidos = 'Los apellidos son obligatorios';
    if (!validarCorreo(form.correo)) e.correo = 'Correo inválido (duoc.cl, profesor.duoc.cl o gmail.com)';
    if (!validarClave(form.clave)) e.clave = 'La contraseña debe tener entre 6 y 20 caracteres';
    if (!validarObligatorio(form.direccion)) e.direccion = 'La dirección es obligatoria';
    return e;
  };

  const guardar = (ev) => {
    ev.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const resultado = editando
      ? actualizarUsuario(run, form)
      : registrarUsuario({ ...form, run: form.run.trim().toUpperCase() });
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate('/admin/usuarios');
  };

  return (
    <>
      <h1 className="h3 mb-3">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      <form onSubmit={guardar} noValidate className="card card-body shadow-sm">
        <ErrorMessage message={errorGeneral} />
        <div className="row">
          <div className="col-md-6">
            <FormField id="run" label="RUN" value={form.run} onChange={cambiar} error={errores.run} disabled={editando} required />
          </div>
          <div className="col-md-6">
            <FormField id="tipo" label="Tipo de usuario" options={['Administrador', 'Vendedor', 'Cliente']} value={form.tipo} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <FormField id="nombre" label="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} required />
          </div>
          <div className="col-md-6">
            <FormField id="apellidos" label="Apellidos" value={form.apellidos} onChange={cambiar} error={errores.apellidos} required />
          </div>
          <div className="col-md-6">
            <FormField id="correo" label="Correo" type="email" value={form.correo} onChange={cambiar} error={errores.correo} required />
          </div>
          <div className="col-md-6">
            <FormField id="clave" label="Contraseña" type="password" value={form.clave} onChange={cambiar} error={errores.clave} required />
          </div>
          <div className="col-md-6">
            <FormField id="region" label="Región" options={Object.keys(regiones)} value={form.region} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <FormField id="comuna" label="Comuna" options={regiones[form.region]} value={form.comuna} onChange={cambiar} />
          </div>
        </div>
        <FormField id="direccion" label="Dirección" value={form.direccion} onChange={cambiar} error={errores.direccion} required />
        <div className="d-flex gap-2">
          <Button label="Guardar" type="submit" />
          <Link to="/admin/usuarios" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}

export default AdminUsuarioFormPage;