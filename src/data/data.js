// Datos iniciales ("semillas") de GasPro. Se copian a localStorage la primera vez.

export const productosSeed = [
  { codigo: 'CL001', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 5 kg', descripcion: 'Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).', unidad: 'Unidad', precioResidencial: 6500, precioComercial: 6000, stock: 80, stockCritico: 10, descuento: 0 },
  { codigo: 'CL002', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 11 kg', descripcion: 'Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.', unidad: 'Unidad', precioResidencial: 12000, precioComercial: 11000, stock: 200, stockCritico: 20, descuento: 10 },
  { codigo: 'CL003', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 15 kg', descripcion: 'Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.', unidad: 'Unidad', precioResidencial: 16000, precioComercial: 14500, stock: 90, stockCritico: 15, descuento: 0 },
  { codigo: 'CL004', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 45 kg', descripcion: 'Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.', unidad: 'Unidad', precioResidencial: 45000, precioComercial: 40000, stock: 30, stockCritico: 5, descuento: 0 },
  { codigo: 'RG001', categoria: 'Reguladores', nombre: 'Regulador doméstico estándar', descripcion: 'Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presión de salida 28 mbar.', unidad: 'Unidad', precioResidencial: 8990, precioComercial: 8200, stock: 45, stockCritico: 8, descuento: 15 },
  { codigo: 'RG002', categoria: 'Reguladores', nombre: 'Regulador de alta presión', descripcion: 'Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.', unidad: 'Unidad', precioResidencial: 18990, precioComercial: 17000, stock: 12, stockCritico: 5, descuento: 0 },
  { codigo: 'RG003', categoria: 'Reguladores', nombre: 'Regulador dual (2 salidas)', descripcion: 'Permite conectar dos artefactos simultáneamente al mismo cilindro.', unidad: 'Unidad', precioResidencial: 14990, precioComercial: 13500, stock: 18, stockCritico: 5, descuento: 0 },
  { codigo: 'MG001', categoria: 'Mangueras y Conexiones', nombre: 'Manguera gas 1.5 m', descripcion: 'Manguera flexible homologada. Diámetro interior 9mm. Compatible con reguladores estándar.', unidad: 'Unidad', precioResidencial: 3990, precioComercial: 3500, stock: 80, stockCritico: 10, descuento: 0 },
  { codigo: 'MG002', categoria: 'Mangueras y Conexiones', nombre: 'Manguera gas 3 m', descripcion: 'Manguera larga para instalaciones donde el artefacto está alejado del cilindro.', unidad: 'Unidad', precioResidencial: 6990, precioComercial: 6200, stock: 50, stockCritico: 10, descuento: 0 },
  { codigo: 'MG003', categoria: 'Mangueras y Conexiones', nombre: 'Abrazadera metálica', descripcion: 'Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.', unidad: 'Unidad', precioResidencial: 990, precioComercial: 800, stock: 200, stockCritico: 30, descuento: 0 },
  { codigo: 'MG004', categoria: 'Mangueras y Conexiones', nombre: 'Kit conexión completo', descripcion: 'Todo lo necesario para instalar un cilindro nuevo (regulador + manguera 1.5m + abrazaderas).', unidad: 'Kit', precioResidencial: 12990, precioComercial: 11500, stock: 25, stockCritico: 5, descuento: 20 },
  { codigo: 'AC001', categoria: 'Accesorios', nombre: 'Carro porta cilindro 11/15 kg', descripcion: 'Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.', unidad: 'Unidad', precioResidencial: 12990, precioComercial: 11000, stock: 20, stockCritico: 5, descuento: 0 },
  { codigo: 'AC002', categoria: 'Accesorios', nombre: 'Tapa protectora para válvula', descripcion: 'Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.', unidad: 'Unidad', precioResidencial: 1490, precioComercial: 1200, stock: 60, stockCritico: 10, descuento: 0 },
  { codigo: 'AC003', categoria: 'Accesorios', nombre: 'Detector de gas a batería', descripcion: 'Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.', unidad: 'Unidad', precioResidencial: 19990, precioComercial: 17000, stock: 8, stockCritico: 3, descuento: 10 },
];

export const categoriasSeed = [
  { id: 'cilindros', nombre: 'Cilindros de Gas', descripcion: 'Cilindros GLP de 5, 11, 15 y 45 kg.', icono: '🛢️' },
  { id: 'reguladores', nombre: 'Reguladores', descripcion: 'Reguladores domésticos, de alta presión y duales.', icono: '🎛️' },
  { id: 'mangueras', nombre: 'Mangueras y Conexiones', descripcion: 'Mangueras, abrazaderas y kits de conexión.', icono: '🔗' },
  { id: 'accesorios', nombre: 'Accesorios', descripcion: 'Carros, tapas protectoras y detectores de gas.', icono: '🧰' },
];

export const zonas = [
  { zona: 'Zona Centro', comunas: 'Chillán (sectores centro, norte y sur)', dias: 'Lunes a Sábado', horario: '08:00 – 20:00', tiempo: '1 – 3 horas' },
  { zona: 'Zona Oriente', comunas: 'Chillán (sector oriente), Chillán Viejo', dias: 'Lunes a Viernes', horario: '08:00 – 18:00', tiempo: '2 – 4 horas' },
  { zona: 'Zona Rural', comunas: 'El Carmen, Pinto, San Ignacio', dias: 'Martes y Jueves', horario: '08:00 – 16:00', tiempo: '3 – 6 horas' },
  { zona: 'Zona Sur', comunas: 'Bulnes, Quillón', dias: 'Miércoles', horario: '08:00 – 16:00', tiempo: '4 – 6 horas' },
  { zona: 'Zona Comercial', comunas: 'Parques industriales y locales comerciales', dias: 'Lunes a Viernes', horario: '07:00 – 17:00', tiempo: 'Según agenda' },
];

export const regiones = {
  'Región de Ñuble': ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes', 'El Carmen', 'Pinto', 'San Ignacio', 'Quillón'],
  'Región Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes', 'Maipú'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
};

// Credenciales de prueba:
//   Administrador -> marcela.fuentes@gmail.com / admin123
//   Vendedor      -> pedro.salazar@duoc.cl     / vendedor1
//   Cliente       -> fer.nunez@gmail.com       / cliente1
export const usuariosDemo = [
  { run: '191234561', nombre: 'Marcela', apellidos: 'Fuentes Rojas', correo: 'marcela.fuentes@gmail.com', clave: 'admin123', tipo: 'Administrador', region: 'Región de Ñuble', comuna: 'Chillán', direccion: 'Av. Libertad 450' },
  { run: '182345679', nombre: 'Pedro', apellidos: 'Salazar Ibáñez', correo: 'pedro.salazar@duoc.cl', clave: 'vendedor1', tipo: 'Vendedor', region: 'Región de Ñuble', comuna: 'Chillán Viejo', direccion: 'Los Aromos 120' },
  { run: '201122333', nombre: 'Fernanda', apellidos: 'Núñez Soto', correo: 'fer.nunez@gmail.com', clave: 'cliente1', tipo: 'Cliente', region: 'Región de Ñuble', comuna: 'Bulnes', direccion: 'Camino Real 890' },
];

export const imagenesProductos = {
  CL001: 'CL001.jpg', CL002: 'CL002.jpg', CL003: 'CL003.jpg', CL004: 'CL004.jpg',
  RG001: 'RG001.jpg', RG002: 'RG002.jpeg', RG003: 'RG003.webp',
  MG001: 'MG001.webp', MG002: 'MG002.webp', MG003: 'MG003.webp', MG004: 'MG004.webp',
  AC001: 'AC001.jpg', AC002: 'AC002.jpg', AC003: 'AC003.jpg',
};

export const blogsSeed = [
  {
    id: 1,
    icono: '🛡️',
    titulo: 'Cómo detectar una fuga de gas a tiempo',
    resumen: 'Señales, olores y sonidos que indican una posible fuga en tu instalación doméstica.',
    contenido: [
      'Una fuga de gas puede ser peligrosa, pero suele dar señales claras si sabes reconocerlas a tiempo. El olor característico a "huevo podrido" que se añade artificialmente al GLP es la primera pista: si lo percibes cerca de tu cilindro o artefactos, cierra la llave de paso de inmediato.',
      'Otras señales incluyen un silbido leve cerca de conexiones o mangueras, plantas marchitas cerca de cañerías subterráneas, y burbujas al aplicar agua jabonosa sobre las uniones. Revisa periódicamente el estado de mangueras y abrazaderas, ya que el desgaste es la causa más común de fugas menores.',
      'Recomendamos instalar un detector de gas a batería en la cocina, cerca del suelo (el GLP es más pesado que el aire), y realizar mantenciones preventivas cada 12 meses. Ante cualquier sospecha, no enciendas interruptores eléctricos, ventila el espacio y contacta a nuestro equipo técnico.',
    ],
  },
  {
    id: 2,
    icono: '🔧',
    titulo: '¿Cada cuánto debo cambiar el regulador de mi cilindro?',
    resumen: 'La vida útil de un regulador y las señales de que ya debes reemplazarlo.',
    contenido: [
      'El regulador es la pieza que controla la presión del gas entre el cilindro y tus artefactos, y su buen estado es clave para un funcionamiento seguro. La recomendación general es reemplazarlo cada 5 años, aunque factores como la exposición al sol, la humedad y el uso frecuente pueden acortar su vida útil.',
      'Algunas señales de que necesitas cambiarlo pronto: la llama de tus artefactos se ve inestable o amarillenta, sientes olor a gas al conectar o desconectar el regulador, o la goma de sellado se ve agrietada o reseca.',
      'En GasPro contamos con reguladores estándar, de alta presión y duales, disponibles para retiro o despacho a domicilio. Si tienes dudas sobre cuál modelo usar según tu artefacto, contacta a nuestro equipo de reparto para que te asesore.',
    ],
  },
];

export const ordenesSeed = [
  {
    id: 20260001, codigoOrden: 'ORDER20260001', fecha: '2026-09-28T15:20:00.000Z', usuarioRun: '201122333',
    cliente: { nombre: 'Fernanda', apellidos: 'Núñez Soto', correo: 'fer.nunez@gmail.com' },
    direccion: { calle: 'Camino Real 890', departamento: '', region: 'Región de Ñuble', comuna: 'Bulnes', indicaciones: 'Dejar con el conserje' },
    entrega: 'Despacho a domicilio', metodoPago: 'tarjeta', estado: 'Pagada', total: 22432,
    items: [
      { codigo: 'CL002', nombre: 'Cilindro GLP 11 kg', precio: 10800, cantidad: 1 },
      { codigo: 'RG001', nombre: 'Regulador doméstico estándar', precio: 7642, cantidad: 1 },
      { codigo: 'MG001', nombre: 'Manguera gas 1.5 m', precio: 3990, cantidad: 1 },
    ],
  },
  {
    id: 20260002, codigoOrden: 'ORDER20260002', fecha: '2026-10-03T11:05:00.000Z', usuarioRun: null,
    cliente: { nombre: 'Luis', apellidos: 'Pérez Mora', correo: 'luis.perez@gmail.com' },
    direccion: { calle: 'Los Aromos 55', departamento: '', region: 'Región de Ñuble', comuna: 'Chillán', indicaciones: '' },
    entrega: 'Despacho a domicilio', metodoPago: 'tarjeta', estado: 'Pagada', total: 45000,
    items: [{ codigo: 'CL004', nombre: 'Cilindro GLP 45 kg', precio: 45000, cantidad: 1 }],
  },
];