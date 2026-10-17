import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/molecules/FormField.jsx';
import Button from '../../components/atoms/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { obtenerCategoria, crearCategoria, actualizarCategoria } from '../../data/categoriasDB.js';
import { validarObligatorio } from '../../utils/validations.js';

function AdminCategoriaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);
  const existente = editando ? obtenerCategoria(id) : null;

  const [form, setForm] = useState(
    () => existente || { nombre: '', descripcion: '', icono: '📦' }
  );
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (editando && !existente) {
    return (
      <div className="alert alert-warning">
        Categoría no encontrada. <Link to="/admin/categorias">Volver a categorías</Link>
      </div>
    );
  }

  const cambiar = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const guardar = (ev) => {
    ev.preventDefault();
    const nuevos = {};
    if (!validarObligatorio(form.nombre)) nuevos.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(form.descripcion)) nuevos.descripcion = 'La descripción es obligatoria';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const datos = { nombre: form.nombre.trim(), descripcion: form.descripcion.trim(), icono: form.icono || '📦' };
    const resultado = editando ? actualizarCategoria(id, datos) : crearCategoria(datos);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate('/admin/categorias');
  };

  return (
    <>
      <h1 className="h3 mb-3">{editando ? 'Editar categoría' : 'Nueva categoría'}</h1>
      <form onSubmit={guardar} noValidate className="card card-body shadow-sm" style={{ maxWidth: '600px' }}>
        <ErrorMessage message={errorGeneral} />
        <FormField id="nombre" label="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} required />
        <FormField id="descripcion" label="Descripción" as="textarea" value={form.descripcion} onChange={cambiar} error={errores.descripcion} required />
        <FormField id="icono" label="Ícono (emoji)" value={form.icono} onChange={cambiar} maxLength={4} />
        <div className="d-flex gap-2">
          <Button label="Guardar" type="submit" />
          <Link to="/admin/categorias" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}

export default AdminCategoriaFormPage;