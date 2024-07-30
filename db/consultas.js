import { pool } from "../db/db.js";
console.log(pool);

// Función para crear un nuevo usuario
export const crearUsuario = async (email, password, nombre, apellidos, rut) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (email, password, nombre, apellidos, rut) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, password, nombre, apellidos, rut]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const obtenerUsuarioPorId = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Función para crear una nueva mascota
export const crearMascota = async (nombre, años, raza, tipo) => {
  try {
    const result = await pool.query(
      "INSERT INTO mascotas (nombre, años, raza, tipo) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, años, raza, tipo]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear la mascota:", error);
    throw error;
  }
};

// Función para obtener todas las mascotas
export const obtenerMascotas = async () => {
  try {
    const result = await pool.query("SELECT * FROM mascotas");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    throw error;
  }
};

// Función para obtener una mascota por su ID
export const obtenerMascotaPorId = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM mascotas WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener la mascota:", error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const crearProducto = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen
) => {
  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, descripcion, precio, stock, imagen]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Función para obtener un producto por su ID
export const obtenerProductoPorId = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

// Función para crear una nueva compra
export const crearCompra = async (usuario_id, total) => {
  try {
    const result = await pool.query(
      "INSERT INTO compras (usuario_id, total) VALUES ($1, $2) RETURNING *",
      [usuario_id, total]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear la compra:", error);
    throw error;
  }
};

// Función para obtener todas las compras
export const obtenerCompras = async () => {
  try {
    const result = await pool.query("SELECT * FROM compras");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

// Función para obtener una compra por su ID
export const obtenerCompraPorId = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM compras WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener la compra:", error);
    throw error;
  }
};

// Función para obtener los detalles de una compra por su ID
export const obtenerDetallesCompra = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM detalles_compra WHERE compra_id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los detalles de la compra:", error);
    throw error;
  }
};

// Función para crear un nuevo contacto
export const crearContacto = async (nombre, email, mensaje) => {
  try {
    const result = await pool.query(
      "INSERT INTO contacto (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, mensaje]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    throw error;
  }
};

// Función para obtener todos los contactos
export const obtenerContactos = async () => {
  try {
    const result = await pool.query("SELECT * FROM contacto");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};

// Función para obtener un contacto por su ID
export const obtenerContactoPorId = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM contacto WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    throw error;
  }
};
