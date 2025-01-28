import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const MapComponent = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Título principal con diseño mejorado */}
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Encuentra Nuestra Ubicación
      </Typography>

      {/* Contenedor para centrar el iframe */}
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ mt: 2 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.860206685066!2d-99.14889792548746!3d19.504649281790204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f94c06d75fd7%3A0x3fe1567da2190ac9!2sESCOM%20-%20Escuela%20Superior%20de%20C%C3%B3mputo%20-%20IPN!5e0!3m2!1ses!2smx!4v1733289261542!5m2!1ses!2smx"
          width="80%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
};

export default MapComponent;