import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../components/organisms/RegistrationForm.jsx';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

const llenar = (confirmar) => {
  escribir(/^RUN/, '123456785');
  escribir(/^Nombre/, 'Ana');
  escribir(/^Apellidos/, 'Pérez Mora');
  escribir(/Correo electrónico/, 'ana@gmail.com');
  escribir(/^Contraseña/, 'secreta1');
  escribir(/Confirmar contraseña/, confirmar);
  escribir(/^Dirección/, 'Calle 123');
};

describe('RegistrationForm', () => {
  it('muestra error si las contraseñas no coinciden', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<RegistrationForm onSubmit={onSubmit} />);
    llenar('otraclave');
    fireEvent.click(screen.getByText('Crear cuenta'));

    expect(screen.getByText('Las contraseñas no coinciden')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('envía los datos cuando todo es válido', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<RegistrationForm onSubmit={onSubmit} />);
    llenar('secreta1');
    fireEvent.click(screen.getByText('Crear cuenta'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('muestra error con un RUN inválido', () => {
    render(<RegistrationForm onSubmit={() => {}} />);
    llenar('secreta1');
    escribir(/^RUN/, '123456780');
    fireEvent.click(screen.getByText('Crear cuenta'));

    expect(screen.getByText(/RUN inválido/)).toBeTruthy();
  });
});