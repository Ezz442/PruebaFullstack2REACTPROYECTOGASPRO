import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard.jsx';
import { productosSeed } from '../data/data.js';

const producto = productosSeed[1]; // CL002: $12.000 con 10% de descuento

const renderizar = (p, onAdd) =>
  render(
    <MemoryRouter>
      <ProductCard producto={p} onAdd={onAdd} />
    </MemoryRouter>
  );

describe('ProductCard', () => {
  it('T05 · muestra nombre, precio con descuento e imagen', () => {
    renderizar(producto, () => {});
    expect(screen.getByText('Cilindro GLP 11 kg')).toBeTruthy();
    expect(screen.getByText('$10.800')).toBeTruthy();
    expect(screen.getByText('-10%')).toBeTruthy();
    expect(screen.getByAltText('Cilindro GLP 11 kg')).toBeTruthy();
  });

  it('T05 · al hacer clic en "Añadir" llama a onAdd (spy) con el producto', () => {
    const onAdd = jasmine.createSpy('onAdd');
    renderizar(producto, onAdd);
    fireEvent.click(screen.getByText('Añadir'));
    expect(onAdd).toHaveBeenCalledWith(producto);
  });

  it('T05 · deshabilita "Añadir" y avisa cuando no hay stock (borde)', () => {
    renderizar({ ...producto, stock: 0 }, () => {});
    expect(screen.getByText('Sin stock')).toBeTruthy();
    expect(screen.getByText('Añadir').disabled).toBeTrue();
  });
});