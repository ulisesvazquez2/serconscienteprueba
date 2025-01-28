const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Obtener todos los eventos
router.get("/", (req, res) => {
  db.query("SELECT * FROM eventos_timeline", (err, result) => {
    if (err) {
      console.error("Error al obtener los eventos", err);
      return res.status(500).send("Error al obtener los eventos");
    }
    res.json(result);
  });
});

// Obtener un evento por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM eventos_timeline WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al obtener el evento", err);
      return res.status(500).send("Error al obtener el evento");
    }
    if (result.length === 0) {
      return res.status(404).send("Evento no encontrado");
    }
    res.json(result[0]);
  });
});

// Crear un nuevo evento
router.post("/", (req, res) => {
  const { titulo, year, descripcion, color } = req.body;
  db.query(
    "INSERT INTO eventos_timeline (titulo, year, descripcion, color) VALUES (?, ?, ?, ?)",
    [titulo, year, descripcion, color],
    (err, result) => {
      if (err) {
        console.error("Error al crear el evento", err);
        return res.status(500).send("Error al crear el evento");
      }
      res.status(201).json({
        id: result.insertId,
        titulo,
        year,
        descripcion,
        color,
      });
    }
  );
});

// Actualizar un evento
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, year, descripcion, color } = req.body;
  db.query(
    "UPDATE eventos_timeline SET titulo = ?, year = ?, descripcion = ?, color = ? WHERE id = ?",
    [titulo, year, descripcion, color, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar el evento", err);
        return res.status(500).send("Error al actualizar el evento");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Evento no encontrado");
      }
      res.json({
        id,
        titulo,
        year,
        descripcion,
        color,
      });
    }
  );
});

// Eliminar un evento
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM eventos_timeline WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el evento", err);
      return res.status(500).send("Error al eliminar el evento");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Evento no encontrado");
    }
    res.json({ message: "Evento eliminado exitosamente" });
  });
});

module.exports = router;