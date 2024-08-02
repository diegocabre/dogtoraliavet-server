import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, password, rut, nombre, apellidos } = req.body;
  try {
    // Verificar si el email ya existe
    const existingUserByEmail = await userModel.findOne(email);
    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    // Verificar si el RUT ya existe
    const existingUserByRut = await userModel.findByRut(rut);
    if (existingUserByRut) {
      return res.status(409).json({ message: "RUT ya registrado" });
    }

    // Crear nuevo usuario con contraseña encriptada
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create(email, hashedPassword, nombre, apellidos, rut);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Email o contraseña inválidos" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await userModel.delete(email);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
