import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutForm from '../components/organisms/CheckoutForm.jsx';

const cliente = {
  nombre: 'Fernanda',
  apellidos: 'Núñez Soto',
  correo: 'fer.nunez@gmail.com',
  calle: 'Camino Real 890',
  region: 'Región de Ñuble',
  comuna: 'Bulnes',
};

describe('CheckoutForm', () => {
  it('precarga los datos del cliente cuando hay sesión', () => {
    render(<CheckoutForm total={12000} datosIniciales={cliente} onSubmit={() => {}} />);
    expect(screen.getByLabelText(/^Nombre/).value).toBe('Fernanda');
    expect(screen.getByLabelText(/^Calle/).value).toBe('Camino Real 890');
    expect(screen.getByLabelText(/^Comuna/).value).toBe('Bulnes');
  });

  it('envía los datos al pagar', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<CheckoutForm total={12000} datosIniciales={cliente} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/Pagar ahora/));
    expect(onSubmit).toHaveBeenCalledWith(jasmine.objectContaining({ nombre: 'Fernanda' }));
  });

  it('muestra errores y no envía si faltan datos (error)', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<CheckoutForm total={12000} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/Pagar ahora/));
    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('oculta la dirección con "Retiro en tienda" (renderizado condicional)', () => {
    render(<CheckoutForm total={12000} datosIniciales={cliente} onSubmit={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Opción de entrega/), { target: { value: 'Retiro en tienda' } });
    expect(screen.queryByLabelText(/^Calle/)).toBeNull();
  });
});