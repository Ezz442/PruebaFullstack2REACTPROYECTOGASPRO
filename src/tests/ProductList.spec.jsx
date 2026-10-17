import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../components/organisms/ProductList.jsx';
import { productosSeed } from '../data/data.js';

describe('ProductList', () => {
  it('T03 · renderiza una tarjeta por cada producto', () => {
    const productos = productosSeed.slice(0, 3);
    render(
      <MemoryRouter>
        <ProductList productos={productos} onAdd={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Añadir').length).toBe(3);
    expect(screen.getByText('Cilindro GLP 5 kg')).toBeTruthy();
    expect(screen.getByText('Cilindro GLP 11 kg')).toBeTruthy();
    expect(screen.getByText('Cilindro GLP 15 kg')).toBeTruthy();
  });

  it('T04 · muestra un mensaje cuando no hay productos (borde)', () => {
    render(
      <MemoryRouter>
        <ProductList productos={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('No hay productos para mostrar')).toBeTruthy();
    expect(screen.queryByText('Añadir')).toBeNull();
  });
});