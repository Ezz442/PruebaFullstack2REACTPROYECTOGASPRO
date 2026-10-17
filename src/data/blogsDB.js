import { leer } from './storage.js';
import { blogsSeed } from './data.js';

const CLAVE = 'gaspro_blogs';

export function obtenerBlogs() {
  return leer(CLAVE, blogsSeed);
}

export function obtenerBlog(id) {
  return obtenerBlogs().find((b) => String(b.id) === String(id)) || null;
}