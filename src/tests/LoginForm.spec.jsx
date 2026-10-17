import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/organisms/LoginForm.jsx';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

describe('LoginForm', () => {
  it('T06 · actualiza el estado del campo al escribir', () => {
    render(<LoginForm onSubmit={() => {}} />);
    escribir(/Correo electrónico/, 'ana@gmail.com');
    expect(screen.getByLabelText(/Correo electrónico/).value).toBe('ana@gmail.com');
  });

  it('T07 · muestra error si el correo es inválido y no envía', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<LoginForm onSubmit={onSubmit} />);
    escribir(/Correo electrónico/, 'abc');
    escribir(/Contraseña/, 'secreta1');
    fireEvent.click(screen.getByText('Iniciar sesión'));

    expect(screen.getByText(/correo válido/)).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('T07 · no envía el formulario si hay campos vacíos', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Iniciar sesión'));

    expect(screen.getByText('El correo es obligatorio')).toBeTruthy();
    expect(screen.getByText('La contraseña es obligatoria')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('T07 · envía correo y clave cuando los datos son válidos', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<LoginForm onSubmit={onSubmit} />);
    escribir(/Correo electrónico/, 'ana@gmail.com');
    escribir(/Contraseña/, 'secreta1');
    fireEvent.click(screen.getByText('Iniciar sesión'));

    expect(onSubmit).toHaveBeenCalledWith('ana@gmail.com', 'secreta1');
  });

  it('T07 · muestra el error general solo cuando se recibe (condicional)', () => {
    const { rerender } = render(<LoginForm onSubmit={() => {}} />);
    expect(screen.queryByRole('alert')).toBeNull();

    rerender(<LoginForm onSubmit={() => {}} errorGeneral="Correo o clave incorrectos" />);
    expect(screen.getByText('Correo o clave incorrectos')).toBeTruthy();
  });
});