import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const montar = (usuario) =>
  render(
    <AuthContext.Provider value={{ usuario }}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['Administrador', 'Vendedor']}>
                <p>Panel</p>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<p>Pantalla de login</p>} />
          <Route path="/" element={<p>Inicio</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe('ProtectedRoute', () => {
  it('redirige a /login si no hay sesión', () => {
    montar(null);
    expect(screen.getByText('Pantalla de login')).toBeTruthy();
  });

  it('redirige al inicio si el rol no corresponde', () => {
    montar({ nombre: 'Fer', tipo: 'Cliente' });
    expect(screen.getByText('Inicio')).toBeTruthy();
  });

  it('muestra el contenido si el rol es permitido', () => {
    montar({ nombre: 'Marcela', tipo: 'Administrador' });
    expect(screen.getByText('Panel')).toBeTruthy();
  });
});