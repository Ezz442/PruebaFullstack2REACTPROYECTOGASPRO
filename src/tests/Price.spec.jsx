import { render, screen } from '@testing-library/react';
import Price from '../components/atoms/Price.jsx';

describe('Price', () => {
  it('T01 · formatea el valor en pesos chilenos', () => {
    render(<Price value={12000} />);
    expect(screen.getByText('$12.000')).toBeTruthy();
  });

  it('T01 · muestra el precio anterior tachado cuando se recibe oldValue', () => {
    render(<Price value={10800} oldValue={12000} />);
    expect(screen.getByText('$10.800')).toBeTruthy();
    expect(screen.getByText('$12.000')).toBeTruthy();
  });

  it('T01 · muestra $0 con valor 0 (borde)', () => {
    render(<Price value={0} />);
    expect(screen.getByText('$0')).toBeTruthy();
  });
});