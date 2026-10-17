import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/molecules/FormField.jsx';
import Button from '../../components/atoms/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import { obtenerProducto, crearProducto, actualizarProducto } from '../../data/productosDB.js';
import { obtenerCategorias } from '../../data/categoriasDB.js';
import { validarObligatorio, validarNumeroNoNegativo } from '../../utils/validations.js';

const CAMPOS_NUMERICOS = ['precioResidencial', 'precioComercial', 'stock', 'stockCritico', 'descuento'];

const VACIO = {
  codigo: '',
  nombre: '',
  categoria: '',
  descripcion: '',
  unidad: 'Unidad',
  precioResidencial: '',
  precioComercial: '',
  stock: '',
  stockCritico: '',
  descuento: '0',
};

function AdminProductoFormPage() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(codigo);
  const categorias = obtenerCategorias();
  const existente = editando ? obtenerProducto(codigo) : null;

  const [form, setForm] = useState(() =>
    existente
      ? Object.fromEntries(Object.entries({ ...VACIO, ...existente }).map(([k, v]) => [k, String(v)]))
      : { ...VACIO, categoria: categorias[0]?.nombre || '' }
  );
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (editando && !existente) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado. <Link to="/admin/productos">Volver a productos</Link>
      </div>
    );
  }

  const cambiar = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validar = () => {
    const e = {};
    if (!editando && !validarObligatorio(form.codigo)) e.codigo = 'El código es obligatorio';
    if (!validarObligatorio(form.nombre)) e.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(form.categoria)) e.categoria = 'Selecciona una categoría';
    if (!validarObligatorio(form.descripcion)) e.descripcion = 'La descripción es obligatoria';
    ['precioResidencial', 'precioComercial', 'stock', 'stockCritico'].forEach((campo) => {
      if (!validarNumeroNoNegativo(form[campo])) e[campo] = 'Ingresa un número válido (0 o mayor)';
    });
    const desc = Number(form.descuento);
    if (!validarNumeroNoNegativo(form.descuento) || desc > 90) e.descuento = 'El descuento debe estar entre 0 y 90';
    return e;
  };

  const guardar = (ev) => {
    ev.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const producto = { ...form };
    CAMPOS_NUMERICOS.forEach((c) => {
      producto[c] = Number(form[c]);
    });
    producto.codigo = form.codigo.trim().toUpperCase();

    const resultado = editando ? actualizarProducto(codigo, producto) : crearProducto(producto);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate('/admin/productos');
  };

  return (
    <>
      <h1 className="h3 mb-3">{editando ? `Editar producto ${codigo}` : 'Nuevo producto'}</h1>
      <form onSubmit={guardar} noValidate className="card card-body shadow-sm">
        <ErrorMessage message={errorGeneral} />
        <div className="row">
          <div className="col-md-4">
            <FormField id="codigo" label="Código" value={form.codigo} onChange={cambiar} error={errores.codigo} disabled={editando} required />
          </div>
          <div className="col-md-8">
            <FormField id="nombre" label="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} required />
          </div>
          <div className="col-md-6">
            <FormField
              id="categoria"
              label="Categoría"
              options={categorias.map((c) => c.nombre)}
              value={form.categoria}
              onChange={cambiar}
              error={errores.categoria}
              required
            />
          </div>
          <div className="col-md-6">
            <FormField id="unidad" label="Unidad" options={['Unidad', 'Kit']} value={form.unidad} onChange={cambiar} />
          </div>
        </div>
        <FormField id="descripcion" label="Descripción" as="textarea" value={form.descripcion} onChange={cambiar} error={errores.descripcion} required />
        <div className="row">
          <div className="col-md-4">
            <FormField id="precioResidencial" label="Precio residencial" type="number" min="0" value={form.precioResidencial} onChange={cambiar} error={errores.precioResidencial} required />
          </div>
          <div className="col-md-4">
            <FormField id="precioComercial" label="Precio comercial" type="number" min="0" value={form.precioComercial} onChange={cambiar} error={errores.precioComercial} required />
          </div>
          <div className="col-md-4">
            <FormField id="descuento" label="Descuento (%)" type="number" min="0" max="90" value={form.descuento} onChange={cambiar} error={errores.descuento} />
          </div>
          <div className="col-md-6">
            <FormField id="stock" label="Stock" type="number" min="0" value={form.stock} onChange={cambiar} error={errores.stock} required />
          </div>
          <div className="col-md-6">
            <FormField id="stockCritico" label="Stock crítico" type="number" min="0" value={form.stockCritico} onChange={cambiar} error={errores.stockCritico} required />
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button label="Guardar" type="submit" />
          <Link to="/admin/productos" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}

export default AdminProductoFormPage;