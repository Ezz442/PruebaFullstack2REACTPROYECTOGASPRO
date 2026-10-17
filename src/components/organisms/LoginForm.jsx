import { useState } from 'react';
import FormField from '../molecules/FormField.jsx';
import Button from '../atoms/Button.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import { validarCorreo, validarObligatorio } from '../../utils/validations.js';

function LoginForm({ onSubmit, errorGeneral = '' }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {};

    if (!validarObligatorio(correo)) nuevos.correo = 'El correo es obligatorio';
    else if (!validarCorreo(correo))
      nuevos.correo = 'Ingresa un correo válido (duoc.cl, profesor.duoc.cl o gmail.com)';

    if (!validarObligatorio(clave)) nuevos.clave = 'La contraseña es obligatoria';

    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onSubmit(correo.trim(), clave);
  };

  return (
    <form onSubmit={enviar} noValidate>
      <ErrorMessage message={errorGeneral} />
      <FormField
        id="correo"
        label="Correo electrónico"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        error={errores.correo}
        required
      />
      <FormField
        id="clave"
        label="Contraseña"
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        error={errores.clave}
        required
      />
      <Button label="Iniciar sesión" type="submit" className="w-100" />
    </form>
  );
}

export default LoginForm;