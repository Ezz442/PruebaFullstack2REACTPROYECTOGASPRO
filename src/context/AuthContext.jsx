/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState } from 'react';
import { leer, guardar, borrar } from '../data/storage.js';
import { autenticar, registrarUsuario, actualizarUsuario } from '../data/usuariosDB.js';

export const AuthContext = createContext(null);

const SESION = 'gaspro_sesion';

const sesionDe = (u) => ({
  run: u.run,
  nombre: u.nombre,
  apellidos: u.apellidos,
  correo: u.correo,
  tipo: u.tipo,
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer(SESION, null));

  const login = (correo, clave) => {
    const encontrado = autenticar(correo, clave);
    if (!encontrado) return { ok: false, error: 'Correo o clave incorrectos' };
    const sesion = sesionDe(encontrado);
    guardar(SESION, sesion);
    setUsuario(sesion);
    return { ok: true, usuario: sesion };
  };

  const registrar = (datos) => {
    const resultado = registrarUsuario({ ...datos, tipo: 'Cliente' });
    if (!resultado.ok) return resultado;
    return login(datos.correo, datos.clave);
  };

  const logout = () => {
    borrar(SESION);
    setUsuario(null);
  };

  const actualizarPerfil = (cambios) => {
    if (!usuario) return { ok: false, error: 'No hay sesión activa' };
    const resultado = actualizarUsuario(usuario.run, cambios);
    if (resultado.ok) {
      const sesion = sesionDe(resultado.usuario);
      guardar(SESION, sesion);
      setUsuario(sesion);
    }
    return resultado;
  };

  const value = useMemo(
    () => ({
      usuario,
      esAdmin: !!usuario && ['Administrador', 'Vendedor'].includes(usuario.tipo),
      login,
      registrar,
      logout,
      actualizarPerfil,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}