import { useState } from 'react';
import FormField from '../molecules/FormField.jsx';
import Button from '../atoms/Button.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import { regiones } from '../../data/data.js';
import {
  validarCorreo,
  validarRut,
  validarClave,
  validarObligatorio,
} from '../../utils/validations.js';

const REGION_INICIAL = Object.keys(regiones)[0];

function RegistrationForm({ onSubmit, errorGeneral = '' }) {
  const [datos, setDatos] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    clave: '',
    confirmar: '',
    region: REGION_INICIAL,
    comuna: regiones[REGION_INICIAL][0],
    direccion: '',
  });
  const [errores, setErrores] = useState({});

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos((prev) =>
      name === 'region'
        ? { ...prev, region: value, comuna: regiones[value][0] }
        : { ...prev, [name]: value }
    );
  };

  const validar = () => {
    const e = {};
    if (!validarRut(datos.run)) e.run = 'RUN inválido (sin puntos ni guion, ej: 19011022K)';
    if (!validarObligatorio(datos.nombre)) e.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(datos.apellidos)) e.apellidos = 'Los apellidos son obligatorios';
    if (!validarCorreo(datos.correo))
      e.correo = 'Ingresa un correo válido (duoc.cl, profesor.duoc.cl o gmail.com)';
    if (!validarClave(datos.clave)) e.clave = 'La contraseña debe tener entre 6 y 20 caracteres';
    if (datos.confirmar !== datos.clave) e.confirmar = 'Las contraseñas no coinciden';
    if (!validarObligatorio(datos.direccion)) e.direccion = 'La dirección es obligatoria';
    return e;
  };

  const enviar = (ev) => {
    ev.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      const { confirmar, ...paraGuardar } = datos; // eslint-disable-line no-unused-vars
      onSubmit(paraGuardar);
    }
  };

  return (
    <form onSubmit={enviar} noValidate>
      <ErrorMessage message={errorGeneral} />
      <div className="row">
        <div className="col-md-6">
          <FormField id="run" label="RUN" value={datos.run} onChange={cambiar} error={errores.run} required />
        </div>
        <div className="col-md-6">
          <FormField id="correo" label="Correo electrónico" type="email" value={datos.correo} onChange={cambiar} error={errores.correo} required />
        </div>
        <div className="col-md-6">
          <FormField id="nombre" label="Nombre" value={datos.nombre} onChange={cambiar} error={errores.nombre} required />
        </div>
        <div className="col-md-6">
          <FormField id="apellidos" label="Apellidos" value={datos.apellidos} onChange={cambiar} error={errores.apellidos} required />
        </div>
        <div className="col-md-6">
          <FormField id="clave" label="Contraseña" type="password" value={datos.clave} onChange={cambiar} error={errores.clave} required />
        </div>
        <div className="col-md-6">
          <FormField id="confirmar" label="Confirmar contraseña" type="password" value={datos.confirmar} onChange={cambiar} error={errores.confirmar} required />
        </div>
        <div className="col-md-6">
          <FormField id="region" label="Región" options={Object.keys(regiones)} value={datos.region} onChange={cambiar} />
        </div>
        <div className="col-md-6">
          <FormField id="comuna" label="Comuna" options={regiones[datos.region]} value={datos.comuna} onChange={cambiar} />
        </div>
      </div>
      <FormField id="direccion" label="Dirección" value={datos.direccion} onChange={cambiar} error={errores.direccion} required />
      <Button label="Crear cuenta" type="submit" className="w-100" />
    </form>
  );
}

export default RegistrationForm;