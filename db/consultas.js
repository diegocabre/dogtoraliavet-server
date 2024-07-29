// src/consultas.js
const pool = require("./db");

// Función para crear un nuevo usuario
const crearUsuario = async (email, password, nombre, apellidos, rut) => {
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
const obtenerUsuarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
const obtenerUsuarioPorId = async (id) => {
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
const crearMascota = async (nombre, años, raza, tipo) => {
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
const obtenerMascotas = async () => {
  try {
    const result = await pool.query("SELECT * FROM mascotas");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    throw error;
  }
};

// Función para obtener una mascota por su ID
const obtenerMascotaPorId = async (id) => {
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
const crearProducto = async (nombre, descripcion, precio, stock, imagen) => {
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
const obtenerProductos = async () => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Función para obtener un producto por su ID
const obtenerProductoPorId = async (id) => {
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

// Función para realizar una compra
const crearCompra = async (usuario_id, total) => {
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
const obtenerCompras = async () => {
  try {
    const result = await pool.query("SELECT * FROM compras");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

// Función para obtener una compra por su ID
const obtenerCompraPorId = async (id) => {
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

// Función para obtener los detalles de una compra
const obtenerDetallesCompra = async (compra_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM detalles_compra WHERE compra_id = $1",
      [compra_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los detalles de la compra:", error);
    throw error;
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  crearCompra,
  obtenerCompras,
  obtenerCompraPorId,
  obtenerDetallesCompra,
};
