import { leer, guardar } from './storage.js';
import { usuariosDemo } from './data.js';

const CLAVE = 'gaspro_usuarios';

export function obtenerUsuarios() {
  return leer(CLAVE, usuariosDemo);
}

export function buscarUsuarioPorCorreo(correo) {
  const c = (correo || '').trim().toLowerCase();
  return obtenerUsuarios().find((u) => u.correo.toLowerCase() === c) || null;
}

export function buscarUsuarioPorRun(run) {
  return obtenerUsuarios().find((u) => u.run === run) || null;
}

// Devuelve el usuario si correo y clave coinciden; si no, null
export function autenticar(correo, clave) {
  const usuario = buscarUsuarioPorCorreo(correo);
  return usuario && usuario.clave === clave ? usuario : null;
}

export function registrarUsuario(usuario) {
  if (buscarUsuarioPorRun(usuario.run)) {
    return { ok: false, error: 'Ya existe un usuario con ese RUN' };
  }
  if (buscarUsuarioPorCorreo(usuario.correo)) {
    return { ok: false, error: 'Ya existe un usuario con ese correo' };
  }
  guardar(CLAVE, [...obtenerUsuarios(), usuario]);
  return { ok: true, usuario };
}

export function actualizarUsuario(run, cambios) {
  const lista = obtenerUsuarios();
  const indice = lista.findIndex((u) => u.run === run);
  if (indice === -1) return { ok: false, error: 'Usuario no encontrado' };
  lista[indice] = { ...lista[indice], ...cambios, run };
  guardar(CLAVE, lista);
  return { ok: true, usuario: lista[indice] };
}

export function eliminarUsuario(run) {
  const lista = obtenerUsuarios();
  const nueva = lista.filter((u) => u.run !== run);
  if (nueva.length === lista.length) return false;
  guardar(CLAVE, nueva);
  return true;
}