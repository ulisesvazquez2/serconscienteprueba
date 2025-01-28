import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para abrir y cerrar el menú
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0} // Elimina la sombra predeterminada
      className="bg-white shadow-md border-b border-gray-200"
      style={{ backgroundColor: '#ffffff' }} // Fuerza el fondo blanco
    >
      <Toolbar className="flex justify-between">
        {/* Logo con texto */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
          <Typography variant="h6" className="text-black font-semibold">
            Ser Consciente
          </Typography>
        </div>

        {/* Navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <Link to="/inicio" className="text-black hover:text-violet-900">Inicio</Link>
          <Link to="/nosotros" className="text-black hover:text-violet-900">Nosotros</Link>
          <Link to="/servicios" className="text-black hover:text-violet-900">Servicios</Link>
          <Link to="/talleres" className="text-black hover:text-violet-900">Talleres y Eventos</Link>
          <Link to="/contacto" className="text-black hover:text-violet-900">Contacto</Link>
        </div>

        {/* Menú hamburguesa solo visible en pantallas pequeñas */}
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={toggleMenu}
          // className="md:hidden text-black" // Solo se muestra en pantallas pequeñas
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer solo visible en pantallas pequeñas */}
        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={toggleMenu}
          // className="md:hidden" // Oculta el Drawer en pantallas medianas y grandes
        >
          <List className="w-64">
            <Link to="/inicio" className="text-black hover:text-violet-900">
              <ListItem button onClick={toggleMenu}>
                <ListItemText>
                  Inicio
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/nosotros" className="text-black hover:text-violet-900">
              <ListItem button onClick={toggleMenu}>
                <ListItemText>
                  Nosotros
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/servicios" className="text-black hover:text-violet-900">
              <ListItem button onClick={toggleMenu}>
                <ListItemText>
                  Servicios
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/talleres" className="text-black hover:text-violet-900">
              <ListItem button onClick={toggleMenu}>
                <ListItemText>
                  Talleres y Eventos
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/contacto" className="text-black hover:text-violet-900">
              <ListItem button onClick={toggleMenu}>
                <ListItemText>
                  Contacto
                </ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
