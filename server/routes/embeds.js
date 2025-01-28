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

// Ruta para obtener todos los embeds
router.get('/', (req, res) => {
    db.query('SELECT * FROM embeds', (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los embeds');
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo embed
router.post('/', (req, res) => {
    const { link } = req.body;
    db.query('INSERT INTO embeds (link) VALUES (?)', [link], (err, results) => {
        if (err) {
            return res.status(500).send('Error al agregar el embed');
        }
        res.status(201).send('Embed agregado exitosamente');
    });
});

// Ruta para eliminar un embed
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM embeds WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Error al eliminar el embed');
        }
        res.status(200).send('Embed eliminado exitosamente');
    });
});

module.exports = router;