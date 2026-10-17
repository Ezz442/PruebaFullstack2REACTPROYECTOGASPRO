import {
  validarCorreo,
  validarRut,
  validarClave,
  validarObligatorio,
  validarNumeroNoNegativo,
} from '../utils/validations.js';

describe('validations', () => {
  it('T09 · validarCorreo acepta solo dominios permitidos', () => {
    expect(validarCorreo('ana@gmail.com')).toBeTrue();
    expect(validarCorreo('ana@duoc.cl')).toBeTrue();
    expect(validarCorreo('ana@hotmail.com')).toBeFalse();
    expect(validarCorreo('sin-arroba')).toBeFalse();
    expect(validarCorreo('')).toBeFalse();
  });

  it('T09 · validarRut verifica el dígito verificador (módulo 11)', () => {
    expect(validarRut('123456785')).toBeTrue();
    expect(validarRut('111111111')).toBeTrue();
    expect(validarRut('1000020')).toBeTrue(); // dígito verificador 0
    expect(validarRut('800000K')).toBeTrue(); // dígito verificador K
    expect(validarRut('123456780')).toBeFalse();
  });

  it('T09 · validarRut rechaza formatos incorrectos', () => {
    expect(validarRut('12.345.678-5')).toBeFalse();
    expect(validarRut('abc')).toBeFalse();
    expect(validarRut('')).toBeFalse();
  });

  it('T09 · validarClave exige entre 6 y 20 caracteres', () => {
    expect(validarClave('abc12')).toBeFalse();
    expect(validarClave('abc123')).toBeTrue();
    expect(validarClave('a'.repeat(21))).toBeFalse();
  });

  it('T09 · validarObligatorio y validarNumeroNoNegativo', () => {
    expect(validarObligatorio('  ')).toBeFalse();
    expect(validarObligatorio('hola')).toBeTrue();
    expect(validarNumeroNoNegativo('0')).toBeTrue();
    expect(validarNumeroNoNegativo('-1')).toBeFalse();
    expect(validarNumeroNoNegativo('')).toBeFalse();
    expect(validarNumeroNoNegativo('abc')).toBeFalse();
  });
});