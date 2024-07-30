import { pool } from "../db/db.js";

const findOne = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
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
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const userModel = { findOne, create };
