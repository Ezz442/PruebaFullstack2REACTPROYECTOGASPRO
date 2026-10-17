// src/tests/mocks/localStorageMock.js
// Reemplaza localStorage por un almacén en memoria. Llamar dentro de beforeEach.
export function instalarLocalStorageMock() {
  let almacen = {};

  spyOn(Storage.prototype, 'getItem').and.callFake((clave) =>
    clave in almacen ? almacen[clave] : null
  );
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    almacen[clave] = String(valor);
  });
  spyOn(Storage.prototype, 'removeItem').and.callFake((clave) => {
    delete almacen[clave];
  });
  spyOn(Storage.prototype, 'clear').and.callFake(() => {
    almacen = {};
  });

  return () => almacen; // por si un test quiere inspeccionar lo guardado
}