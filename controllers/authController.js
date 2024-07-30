import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, password, rut, nombre, apellidos } = req.body;
  try {
    await userModel.create({
      email,
      password: await bcrypt.hash(password, 10), // Corrección aquí
      rut,
      nombre,
      apellidos,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Corrección aquí
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
