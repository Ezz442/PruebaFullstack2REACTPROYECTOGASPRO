import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/atoms/Button.jsx';

describe('Button', () => {
  it('T02 · muestra la etiqueta recibida por props', () => {
    render(<Button label="Guardar" />);
    expect(screen.getByText('Guardar')).toBeTruthy();
  });

  it('T02 · llama a onClick (spy) al hacer clic', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button label="Guardar" onClick={onClick} />);
    fireEvent.click(screen.getByText('Guardar'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('T02 · no llama a onClick si está deshabilitado (borde)', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button label="Guardar" onClick={onClick} disabled />);
    fireEvent.click(screen.getByText('Guardar'));
    expect(onClick).not.toHaveBeenCalled();
  });
});