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

// Obtener todos los servicios
router.get("/", (req, res) => {
    db.query("SELECT * FROM servicios", (err, result) => {
        if (err) {
            console.error("Error al obtener los servicios", err);
            return res.status(500).send("Error al obtener los servicios");
        }
        res.json(result);
    });
});

// Obtener un servicio por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM servicios WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al obtener el servicio", err);
            return res.status(500).send("Error al obtener el servicio");
        }
        if (result.length === 0) {
            return res.status(404).send("Servicio no encontrado");
        }
        res.json(result[0]);
    });
});

// Crear un nuevo servicio
router.post("/", (req, res) => {
    const { titulo, descripcion, detalle, rutaImagen } = req.body;
    db.query(
        "INSERT INTO servicios (titulo, descripcion, detalle, rutaImagen) VALUES (?, ?, ?, ?)",
        [titulo, descripcion, detalle, rutaImagen],
        (err, result) => {
            if (err) {
                console.error("Error al crear el servicio", err);
                return res.status(500).send("Error al crear el servicio");
            }
            res.status(201).json({
                id: result.insertId,
                titulo,
                descripcion,
                detalle,
                rutaImagen,
            });
        }
    );
});

// Actualizar un servicio
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, detalle, rutaImagen } = req.body;
    db.query(
        "UPDATE servicios SET titulo = ?, descripcion = ?, detalle = ?, rutaImagen = ? WHERE id = ?",
        [titulo, descripcion, detalle, rutaImagen, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar el servicio", err);
                return res.status(500).send("Error al actualizar el servicio");
            }
            if (result.affectedRows === 0) {
                return res.status(404).send("Servicio no encontrado");
            }
            res.json({
                id,
                titulo,
                descripcion,
                detalle,
                rutaImagen,
            });
        }
    );
});

// Eliminar un servicio
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM servicios WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar el servicio", err);
            return res.status(500).send("Error al eliminar el servicio");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Servicio no encontrado");
        }
        res.json({ message: "Servicio eliminado exitosamente" });
    });
});

module.exports = router;