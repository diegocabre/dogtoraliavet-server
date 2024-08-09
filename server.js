import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { userModel } from "./models/user.model.js";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  crearMensajeContacto,
  obtenerMensajesContacto,
  obtenerMensajeContactoPorId,
  responderMensajeContacto,
} from "./db/consultas.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const secret = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token no proporcionado" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token no válido" });

    req.userId = decoded.email; // O decoded.id
    next();
  });
};

// Ruta para obtener los datos del usuario autenticado
app.get("/api/usuarios/me", verificarToken, async (req, res) => {
  try {
    const usuario = await userModel.findOne(req.userId);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener los datos del usuario",
        detalles: error.message,
      });
  }
});

// Rutas de API para usuarios
app.post("/api/usuarios", async (req, res) => {
  try {
    const { email, password, nombre, apellidos, rut } = req.body;

    if (!email || !password || !nombre || !apellidos || !rut) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ error: "El email no tiene un formato válido." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }
    if (!validateRut(rut)) {
      return res
        .status(400)
        .json({ error: "El RUT no tiene un formato válido." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const nuevoUsuario = await crearUsuario(
      email,
      hashedPassword,
      nombre,
      apellidos,
      rut
    );
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res
      .status(500)
      .json({ error: "Error al crear el usuario", detalles: error.message });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener los usuarios",
        detalles: error.message,
      });
  }
});

app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el usuario", detalles: error.message });
  }
});

// Rutas de API para mascotas
app.post("/api/mascotas", async (req, res) => {
  try {
    const { nombre, años, raza, tipo } = req.body;
    const nuevaMascota = await crearMascota(nombre, años, raza, tipo);
    res.status(201).json(nuevaMascota);
  } catch (error) {
    console.error("Error al crear la mascota:", error);
    res
      .status(500)
      .json({ error: "Error al crear la mascota", detalles: error.message });
  }
});

app.get("/api/mascotas", async (req, res) => {
  try {
    const mascotas = await obtenerMascotas();
    res.status(200).json(mascotas);
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener las mascotas",
        detalles: error.message,
      });
  }
});

app.get("/api/mascotas/:id", async (req, res) => {
  try {
    const mascota = await obtenerMascotaPorId(req.params.id);
    res.status(200).json(mascota);
  } catch (error) {
    console.error("Error al obtener la mascota:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la mascota", detalles: error.message });
  }
});

// Rutas de API para productos
app.post("/api/productos", async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen } = req.body;
    const nuevoProducto = await crearProducto(
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    );
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res
      .status(500)
      .json({ error: "Error al crear el producto", detalles: error.message });
  }
});

app.get("/api/productos", async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener los productos",
        detalles: error.message,
      });
  }
});

app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await obtenerProductoPorId(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el producto", detalles: error.message });
  }
});

// Rutas de API para compras
app.post("/api/compras", async (req, res) => {
  try {
    const { usuario_id, total } = req.body;
    const nuevaCompra = await crearCompra(usuario_id, total);
    res.status(201).json(nuevaCompra);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    res
      .status(500)
      .json({ error: "Error al crear la compra", detalles: error.message });
  }
});

app.get("/api/compras", async (req, res) => {
  try {
    const compras = await obtenerCompras();
    res.status(200).json(compras);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las compras", detalles: error.message });
  }
});

app.get("/api/compras/:id", async (req, res) => {
  try {
    const compra = await obtenerCompraPorId(req.params.id);
    res.status(200).json(compra);
  } catch (error) {
    console.error("Error al obtener la compra:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la compra", detalles: error.message });
  }
});

// Rutas de API para reservas
app.post("/api/reservas", async (req, res) => {
  try {
    const { usuario_id, fecha, hora, servicio } = req.body;
    const nuevaReserva = await crearReserva(usuario_id, fecha, hora, servicio);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res
      .status(500)
      .json({ error: "Error al crear la reserva", detalles: error.message });
  }
});

app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await obtenerReservas();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener las reservas",
        detalles: error.message,
      });
  }
});

app.get("/api/reservas/:id", async (req, res) => {
  try {
    const reserva = await obtenerReservaPorId(req.params.id);
    res.status(200).json(reserva);
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la reserva", detalles: error.message });
  }
});

// Rutas de API para mensajes de contacto
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    const nuevoMensaje = await crearMensajeContacto(nombre, email, mensaje);
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.error("Error al crear el mensaje de contacto:", error);
    res
      .status(500)
      .json({
        error: "Error al crear el mensaje de contacto",
        detalles: error.message,
      });
  }
});

app.get("/api/contacto", async (req, res) => {
  try {
    const mensajes = await obtenerMensajesContacto();
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener los mensajes de contacto:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener los mensajes de contacto",
        detalles: error.message,
      });
  }
});

app.get("/api/contacto/:id", async (req, res) => {
  try {
    const mensaje = await obtenerMensajeContactoPorId(req.params.id);
    res.status(200).json(mensaje);
  } catch (error) {
    console.error("Error al obtener el mensaje de contacto:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener el mensaje de contacto",
        detalles: error.message,
      });
  }
});

app.post("/api/contacto/:id/responder", async (req, res) => {
  try {
    const { respuesta } = req.body;
    const mensaje = await responderMensajeContacto(req.params.id, respuesta);
    res.status(200).json(mensaje);
  } catch (error) {
    console.error("Error al responder el mensaje de contacto:", error);
    res
      .status(500)
      .json({
        error: "Error al responder el mensaje de contacto",
        detalles: error.message,
      });
  }
});

// Inicializa el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
