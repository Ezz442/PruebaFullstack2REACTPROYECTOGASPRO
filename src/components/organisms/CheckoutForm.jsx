import { useState } from 'react';
import FormField from '../molecules/FormField.jsx';
import Button from '../atoms/Button.jsx';
import { regiones } from '../../data/data.js';
import { validarCorreo, validarObligatorio } from '../../utils/validations.js';
import { formatearPrecio } from '../../utils/formatters.js';

const REGION_INICIAL = Object.keys(regiones)[0];

// Si hay sesión iniciada, la página pasa `datosIniciales` y el formulario se precarga
function CheckoutForm({ total, datosIniciales = {}, onSubmit }) {
  const [datos, setDatos] = useState(() => {
    const region = datosIniciales.region || REGION_INICIAL;
    return {
      nombre: '',
      apellidos: '',
      correo: '',
      calle: '',
      departamento: '',
      indicaciones: '',
      entrega: 'Despacho a domicilio',
      metodoPago: 'tarjeta',
      ...datosIniciales,
      region,
      comuna: datosIniciales.comuna || regiones[region][0],
    };
  });
  const [errores, setErrores] = useState({});

  const despacho = datos.entrega === 'Despacho a domicilio';

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
    if (!validarObligatorio(datos.nombre)) e.nombre = 'El nombre es obligatorio';
    if (!validarObligatorio(datos.apellidos)) e.apellidos = 'Los apellidos son obligatorios';
    if (!validarCorreo(datos.correo)) e.correo = 'Ingresa un correo válido';
    if (despacho && !validarObligatorio(datos.calle)) e.calle = 'La calle es obligatoria';
    return e;
  };

  const enviar = (ev) => {
    ev.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onSubmit(datos);
  };

  return (
    <form onSubmit={enviar} noValidate>
      <h5 className="mt-3">Información del cliente</h5>
      <div className="row">
        <div className="col-md-6">
          <FormField id="nombre" label="Nombre" value={datos.nombre} onChange={cambiar} error={errores.nombre} required />
        </div>
        <div className="col-md-6">
          <FormField id="apellidos" label="Apellidos" value={datos.apellidos} onChange={cambiar} error={errores.apellidos} required />
        </div>
        <div className="col-12">
          <FormField id="correo" label="Correo" type="email" value={datos.correo} onChange={cambiar} error={errores.correo} required />
        </div>
      </div>

      <h5 className="mt-3">Entrega</h5>
      <FormField
        id="entrega"
        label="Opción de entrega"
        options={['Despacho a domicilio', 'Retiro en tienda']}
        value={datos.entrega}
        onChange={cambiar}
      />

      {despacho && (
        <>
          <div className="row">
            <div className="col-md-8">
              <FormField id="calle" label="Calle" value={datos.calle} onChange={cambiar} error={errores.calle} required />
            </div>
            <div className="col-md-4">
              <FormField id="departamento" label="Departamento (opcional)" placeholder="Ej: 603" value={datos.departamento} onChange={cambiar} />
            </div>
            <div className="col-md-6">
              <FormField id="region" label="Región" options={Object.keys(regiones)} value={datos.region} onChange={cambiar} />
            </div>
            <div className="col-md-6">
              <FormField id="comuna" label="Comuna" options={regiones[datos.region]} value={datos.comuna} onChange={cambiar} />
            </div>
          </div>
          <FormField
            id="indicaciones"
            label="Indicaciones para la entrega (opcional)"
            as="textarea"
            placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
            value={datos.indicaciones}
            onChange={cambiar}
          />
        </>
      )}

      <h5 className="mt-3">Pago</h5>
      <FormField
        id="metodoPago"
        label="Método de pago"
        options={[
          { value: 'tarjeta', label: 'Tarjeta (simulada)' },
          { value: 'rechazado', label: 'Simular pago rechazado' },
        ]}
        value={datos.metodoPago}
        onChange={cambiar}
      />

      <div className="text-end">
        <Button label={`Pagar ahora ${formatearPrecio(total)}`} type="submit" variant="success" />
      </div>
    </form>
  );
}

export default CheckoutForm;