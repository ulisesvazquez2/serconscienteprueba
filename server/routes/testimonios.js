// routes/testimonios.js
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

// Ruta para obtener todos los testimonios
router.get('/', (req, res) => {
    db.query('SELECT * FROM testimonios', (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los testimonios');
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo testimonio
router.post('/', (req, res) => {
    const { nombre, rol, mensaje, emoji } = req.body;
    db.query('INSERT INTO testimonios (nombre, rol, mensaje, emoji) VALUES (?, ?, ?, ?)', [nombre, rol, mensaje, emoji], (err, results) => {
        if (err) {
            return res.status(500).send('Error al agregar el testimonio');
        }
        res.status(201).send('Testimonio agregado exitosamente');
    });
});

// Actualizar un testimonio
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, rol, mensaje, emoji } = req.body;
    db.query(
        "UPDATE testimonios SET nombre = ?, rol = ?, mensaje = ?, emoji = ? WHERE id = ?",
        [nombre, rol, mensaje, emoji, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar el servicio", err);
                return res.status(500).send("Error al actualizar el servicio");
            }
            if (result.affectedRows === 0) {
                return res.status(404).send("Servicio no encontrado");
            }
            res.json({
                nombre, 
                rol, 
                mensaje, 
                emoji 
            });
        }
    );
});

// Ruta para eliminar un testimonio
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM testimonios WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Error al eliminar el testimonio');
        }
        res.status(200).send('Testimonio eliminado exitosamente');
    });
});

module.exports = router;
