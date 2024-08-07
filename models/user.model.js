import { pool } from "../db/db.js";

const findOne = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];  // Retorna el primer usuario encontrado
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const findByRut = async (rut) => {
  try {
    const query = "SELECT * FROM usuarios WHERE rut = $1";
    const { rows } = await pool.query(query, [rut]);
    return rows[0];  // Retorna el primer usuario encontrado
  } catch (error) {
    console.error("Error fetching user by RUT:", error);
    throw error;
  }
};

const create = async (email, password, nombre, apellidos, rut) => {
  try {
    const query =
      "INSERT INTO usuarios (email, password, nombre, apellidos, rut) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [
      email,
      password,
      nombre,
      apellidos,
      rut,
    ]);
    return rows[0];  // Retorna el usuario creado
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const deleteUser = async (email) => {
  try {
    const query = "DELETE FROM usuarios WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rowCount;  // Retorna el número de filas afectadas
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const userModel = { findOne, findByRut, create, deleteUser };
