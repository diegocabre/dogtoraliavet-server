// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
} = require("./db/consultas");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rutas de API
app.post("/api/usuarios", async (req, res) => {
  try {
    const { email, password, nombre, apellidos, rut } = req.body;
    const nuevoUsuario = await crearUsuario(
      email,
      password,
      nombre,
      apellidos,
      rut
    );
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
