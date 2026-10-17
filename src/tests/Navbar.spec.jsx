import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { instalarLocalStorageMock } from './mocks/localStorageMock.js';

const montar = ({ cantidadTotal = 0, usuario = null } = {}) =>
  render(
    <AuthContext.Provider value={{ usuario, esAdmin: false, logout: () => {} }}>
      <CartContext.Provider value={{ cantidadTotal, total: 0 }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    </AuthContext.Provider>
  );

describe('Navbar', () => {
  beforeEach(() => {
    instalarLocalStorageMock();
  });

  it('el contador refleja la cantidad de productos del carrito', () => {
    montar({ cantidadTotal: 3 });
    expect(screen.getByLabelText('Productos en el carrito').textContent).toBe('3');
  });

  it('sin sesión muestra "Iniciar Sesión" y "Crear Cuenta"', () => {
    montar();
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByText('Crear Cuenta')).toBeTruthy();
  });

  it('con sesión saluda al usuario', () => {
    montar({ usuario: { nombre: 'Fernanda', tipo: 'Cliente' } });
    expect(screen.getByText('Hola, Fernanda')).toBeTruthy();
    expect(screen.queryByText('Iniciar Sesión')).toBeNull();
  });
});