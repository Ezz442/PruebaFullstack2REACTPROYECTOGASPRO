import { useState } from 'react';
import FormField from '../../components/molecules/FormField.jsx';
import Button from '../../components/atoms/Button.jsx';
import { validarCorreo, validarObligatorio } from '../../utils/validations.js';

const VACIO = { nombre: '', correo: '', mensaje: '' };

function ContactoPage() {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setDatos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEnviado(false);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {};
    if (!validarObligatorio(datos.nombre)) nuevos.nombre = 'El nombre es obligatorio';
    if (!validarCorreo(datos.correo)) nuevos.correo = 'Ingresa un correo válido';
    if (datos.mensaje.trim().length < 10) nuevos.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    setErrores(nuevos);

    if (Object.keys(nuevos).length === 0) {
      setEnviado(true);
      setDatos(VACIO);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-7">
        <h1 className="h3 mb-3">Contacto</h1>
        <p className="text-muted">¿Dudas sobre un pedido o un producto? Escríbenos.</p>

        {enviado && <div className="alert alert-success">¡Gracias! Recibimos tu mensaje y te responderemos pronto.</div>}

        <form onSubmit={enviar} noValidate>
          <FormField id="nombre" label="Nombre" value={datos.nombre} onChange={cambiar} error={errores.nombre} required />
          <FormField id="correo" label="Correo" type="email" value={datos.correo} onChange={cambiar} error={errores.correo} required />
          <FormField id="mensaje" label="Mensaje" as="textarea" value={datos.mensaje} onChange={cambiar} error={errores.mensaje} required />
          <Button label="Enviar mensaje" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ContactoPage;