const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

// Importar las rutas modulares
const embedsRoutes = require('./routes/embeds');
const sendEmailRoutes = require('./routes/mail');
const testimoniosRoutes = require('./routes/testimonios');
const serviciosRoutes = require('./routes/servicios');
const cursosTalleresRoutes = require('./routes/cursosTalleres');
const eventosTLRoutes = require('./routes/eventosTL');


// Crear aplicación Express
const app = express();

// Middleware
app.use(cors()); // Para habilitar CORS
app.use(express.json()); // Para parsear JSON en las peticiones

// Rutas de la API
app.use('/api/embeds', embedsRoutes);  // Rutas para manejar los embeds
app.use('/api/mail', sendEmailRoutes);  // Ruta para manejar el envío de correos
app.use('/api/testimonios', testimoniosRoutes); //Ruta para manejar los testimonios
app.use('/api/servicios', serviciosRoutes); //Ruta para manejar los servicios
app.use('/api/cursos_talleres', cursosTalleresRoutes); //Ruta para manejar los cursos y talleres
app.use('/api/eventos_timeline', eventosTLRoutes); //Ruta para manejar los cursos y talleres

// Configurar puerto
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});