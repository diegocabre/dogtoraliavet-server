import { pool } from "../db/db.js";
import bcrypt from "bcrypt";

// Función para crear un nuevo usuario
export const crearUsuario = async (email, password, nombre, apellidos, rut) => {
  try {
    // Hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO usuarios (email, password, nombre, apellidos, rut, rol) VALUES ($1, $2, $3, $4, $5, 'usuario') RETURNING *",
      [email, hashedPassword, nombre, apellidos, rut]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const result = await pool.query(
      "SELECT id, email, nombre, apellidos, rut, rol FROM usuarios"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const obtenerUsuarioPorId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, email, nombre, apellidos, rut, rol, foto_perfil FROM usuarios WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    throw error;
  }
};

// Función para crear una nueva mascota
export const crearMascota = async (usuario_id, nombre, especie, raza, edad) => {
  try {
    const result = await pool.query(
      "INSERT INTO mascotas (usuario_id, nombre, especie, raza, edad) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [usuario_id, nombre, especie, raza, edad]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear la mascota:", error.message);
    throw error;
  }
};

// Función para obtener todas las mascotas
export const obtenerMascotas = async () => {
  try {
    const result = await pool.query(
      "SELECT id, usuario_id, nombre, especie, raza, edad FROM mascotas"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las mascotas:", error.message);
    throw error;
  }
};

// Función para obtener una mascota por su ID
export const obtenerMascotaPorId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, usuario_id, nombre, especie, raza, edad FROM mascotas WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener la mascota:", error.message);
    throw error;
  }
};

// Función para crear un nuevo producto
export const crearProducto = async (
  nombre,
  descripcion,
  precio,
  imagen_url,
  creado_por
) => {
  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, imagen_url, creado_por) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, descripcion, precio, imagen_url, creado_por]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    throw error;
  }
};

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, descripcion, precio, imagen_url, creado_por FROM productos"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    throw error;
  }
};

// Función para obtener un producto por su ID
export const obtenerProductoPorId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, descripcion, precio, imagen_url, creado_por FROM productos WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    throw error;
  }
};

// Función para crear una nueva reserva
export const crearReserva = async (
  usuario_id,
  mascota_id,
  setmore_reserva_id,
  fecha_reserva,
  hora_reserva,
  comentario
) => {
  try {
    const result = await pool.query(
      "INSERT INTO reservas (usuario_id, mascota_id, setmore_reserva_id, fecha_reserva, hora_reserva, comentario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        usuario_id,
        mascota_id,
        setmore_reserva_id,
        fecha_reserva,
        hora_reserva,
        comentario,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear la reserva:", error.message);
    throw error;
  }
};

// Función para obtener todas las reservas
export const obtenerReservas = async () => {
  try {
    const result = await pool.query(
      "SELECT id, usuario_id, mascota_id, setmore_reserva_id, fecha_reserva, hora_reserva, comentario FROM reservas"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las reservas:", error.message);
    throw error;
  }
};

// Función para obtener una reserva por su ID
export const obtenerReservaPorId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, usuario_id, mascota_id, setmore_reserva_id, fecha_reserva, hora_reserva, comentario FROM reservas WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener la reserva:", error.message);
    throw error;
  }
};

// Función para crear un nuevo mensaje de contacto
export const crearMensajeContacto = async (nombre, email, mensaje) => {
  try {
    const result = await pool.query(
      "INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, mensaje]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el mensaje de contacto:", error.message);
    throw error;
  }
};

// Función para obtener todos los mensajes de contacto
export const obtenerMensajesContacto = async () => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, email, mensaje, respondido, respuesta, enviado_en, respondido_por, respondido_en FROM mensajes_contacto"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los mensajes de contacto:", error.message);
    throw error;
  }
};

// Función para obtener un mensaje de contacto por su ID
export const obtenerMensajeContactoPorId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, email, mensaje, respondido, respuesta, enviado_en, respondido_por, respondido_en FROM mensajes_contacto WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el mensaje de contacto:", error.message);
    throw error;
  }
};

// Función para responder un mensaje de contacto
export const responderMensajeContacto = async (
  id,
  respuesta,
  respondido_por
) => {
  try {
    const result = await pool.query(
      "UPDATE mensajes_contacto SET respondido = TRUE, respuesta = $1, respondido_por = $2, respondido_en = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
      [respuesta, respondido_por, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al responder el mensaje de contacto:", error.message);
    throw error;
  }
};
