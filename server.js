import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.js";
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
  crearCompra,
  obtenerCompras,
  obtenerCompraPorId,
  obtenerDetallesCompra,
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
} from "./db/consultas.js";

const saltRounds = 10; // Número de rondas de sal
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de API para usuarios
app.post("/api/usuarios", async (req, res) => {
  try {
    const { email, password, nombre, apellidos, rut } = req.body;

    // Encriptar contraseña antes de guardarla
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
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
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
    res.status(500).json({ error: "Error al crear la mascota" });
  }
});

app.get("/api/mascotas", async (req, res) => {
  try {
    const mascotas = await obtenerMascotas();
    res.status(200).json(mascotas);
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    res.status(500).json({ error: "Error al obtener las mascotas" });
  }
});

app.get("/api/mascotas/:id", async (req, res) => {
  try {
    const mascota = await obtenerMascotaPorId(req.params.id);
    res.status(200).json(mascota);
  } catch (error) {
    console.error("Error al obtener la mascota:", error);
    res.status(500).json({ error: "Error al obtener la mascota" });
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
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

app.get("/api/productos", async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await obtenerProductoPorId(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
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
    res.status(500).json({ error: "Error al crear la compra" });
  }
});

app.get("/api/compras", async (req, res) => {
  try {
    const compras = await obtenerCompras();
    res.status(200).json(compras);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ error: "Error al obtener las compras" });
  }
});

app.get("/api/compras/:id", async (req, res) => {
  try {
    const compra = await obtenerCompraPorId(req.params.id);
    res.status(200).json(compra);
  } catch (error) {
    console.error("Error al obtener la compra:", error);
    res.status(500).json({ error: "Error al obtener la compra" });
  }
});

app.get("/api/compras/:id/detalles", async (req, res) => {
  try {
    const detalles = await obtenerDetallesCompra(req.params.id);
    res.status(200).json(detalles);
  } catch (error) {
    console.error("Error al obtener los detalles de la compra:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los detalles de la compra" });
  }
});

// Rutas de API para contacto
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    const nuevoContacto = await crearContacto(nombre, email, mensaje);
    res.status(201).json(nuevoContacto);
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    res.status(500).json({ error: "Error al crear el contacto" });
  }
});

app.get("/api/contacto", async (req, res) => {
  try {
    const contactos = await obtenerContactos();
    res.status(200).json(contactos);
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    res.status(500).json({ error: "Error al obtener los contactos" });
  }
});

app.get("/api/contacto/:id", async (req, res) => {
  try {
    const contacto = await obtenerContactoPorId(req.params.id);
    res.status(200).json(contacto);
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    res.status(500).json({ error: "Error al obtener el contacto" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
