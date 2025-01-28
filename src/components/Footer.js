import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material'; // Si deseas agregar iconos sociales

const Footer = () => (
  <footer style={{ backgroundColor: '#333', color: '#fff' }}>
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
        <Typography variant="h6" gutterBottom>
          Ser Consciente
        </Typography>

        <Typography variant="body2" align="center" gutterBottom>
          © 2024 Ser Consciente. Todos los derechos reservados.
        </Typography>

        <Typography variant="body2" align="center" gutterBottom>
          <Link href="mailto:info@serconsciente.com" color="inherit">
            info@serconsciente.com
          </Link>
          {' | '}
          <Link href="tel:+1234567890" color="inherit">
            +123 456 7890
          </Link>
        </Typography>

        {/* Si deseas agregar iconos de redes sociales */}
        <Box mt={2}>
          <Link href="https://facebook.com" color="inherit" style={{ margin: '0 10px' }}>
            <Facebook />
          </Link>
          <Link href="https://instagram.com" color="inherit" style={{ margin: '0 10px' }}>
            <Instagram />
          </Link>
          {/* <Link href="https://twitter.com" color="inherit" style={{ margin: '0 10px' }}>
            <Twitter />
          </Link> */}
        </Box>
      </Box>
    </Container>
  </footer>
);

export default Footer;
