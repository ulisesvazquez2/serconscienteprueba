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

// Obtener todos los cursos/talleres
router.get("/", (req, res) => {
    db.query("SELECT * FROM cursos_talleres", (err, result) => {
        if (err) {
            console.error("Error al obtener los cursos/talleres", err);
            return res.status(500).send("Error al obtener los cursos/talleres");
        }
        res.json(result);
    });
});

// Obtener un curso/taller por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM cursos_talleres WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al obtener el curso/taller", err);
            return res.status(500).send("Error al obtener el curso/taller");
        }
        if (result.length === 0) {
            return res.status(404).send("Curso/Taller no encontrado");
        }
        res.json(result[0]);
    });
});

// Crear un nuevo curso/taller
router.post("/", (req, res) => {
    const { tipo, titulo, fecha_inicio, fecha_fin, descripcion } = req.body;
    db.query(
        "INSERT INTO cursos_talleres (tipo, titulo, fecha_inicio, fecha_fin, descripcion) VALUES (?, ?, ?, ?, ?)",
        [tipo, titulo, fecha_inicio, fecha_fin, descripcion],
        (err, result) => {
            if (err) {
                console.error("Error al crear el curso/taller", err);
                return res.status(500).send("Error al crear el curso/taller");
            }
            res.status(201).json({
                id: result.insertId,
                tipo,
                titulo,
                fecha_inicio,
                fecha_fin,
                descripcion,
            });
        }
    );
});

// Actualizar un curso/taller
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { tipo, titulo, fecha_inicio, fecha_fin, descripcion } = req.body;
    db.query(
        "UPDATE cursos_talleres SET tipo = ?, titulo = ?, fecha_inicio = ?, fecha_fin = ?, descripcion = ? WHERE id = ?",
        [tipo, titulo, fecha_inicio, fecha_fin, descripcion, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar el curso/taller", err);
                return res.status(500).send("Error al actualizar el curso/taller");
            }
            if (result.affectedRows === 0) {
                return res.status(404).send("Curso/Taller no encontrado");
            }
            res.json({
                id,
                tipo,
                titulo,
                fecha_inicio,
                fecha_fin,
                descripcion,
            });
        }
    );
});

// Eliminar un curso/taller
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM cursos_talleres WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar el curso/taller", err);
            return res.status(500).send("Error al eliminar el curso/taller");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Curso/Taller no encontrado");
        }
        res.json({ message: "Curso/Taller eliminado exitosamente" });
    });
});

module.exports = router;