import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEmbeds, addEmbed, deleteEmbed } from '../utils/api'; // Funciones de API

const AdminPanel = () => {
  const [embeds, setEmbeds] = useState([]); // Para almacenar los embeds
  const [newEmbedLink, setNewEmbedLink] = useState(''); // Enlace del nuevo embed
  const [openSnackbar, setOpenSnackbar] = useState(false); // Para mostrar el mensaje del Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // El mensaje del Snackbar
  const [openDialog, setOpenDialog] = useState(false);  // Para manejar la visibilidad del modal de confirmación
  const [selectedIndex, setSelectedIndex] = useState(null);  // Para saber qué embed se seleccionó para eliminar

  // Cargar los embeds desde la base de datos cuando el componente se monta
  useEffect(() => {
    const fetchEmbeds = async () => {
      const fetchedEmbeds = await getEmbeds();
      setEmbeds(Array.isArray(fetchedEmbeds) ? fetchedEmbeds : []); // Verificar que fetchedEmbeds sea un array
    };
    fetchEmbeds();
  }, []);

  // Agregar un embed
  const handleAddEmbed = async () => {
    const validLink = extractLink(newEmbedLink);
    if (validLink) {
      try {
        await addEmbed(validLink); // Agregar el embed a la base de datos
        setNewEmbedLink(''); // Limpiar el campo de enlace
        setSnackbarMessage('Embed agregado exitosamente.');
        setOpenSnackbar(true);
        const updatedEmbeds = await getEmbeds(); // Obtener los embeds actualizados
        setEmbeds(Array.isArray(updatedEmbeds) ? updatedEmbeds : []); // Verificar que updatedEmbeds sea un array
      } catch (error) {
        setSnackbarMessage('Error al agregar el embed.');
        setOpenSnackbar(true);
        console.error('Error al agregar el embed:', error);
      }
    } else {
      setSnackbarMessage('Por favor ingrese un enlace válido de Facebook o Instagram.');
      setOpenSnackbar(true);
    }
  };

  // Confirmar eliminación del embed
  const handleOpenDialog = (index) => {
    setSelectedIndex(index); // Guardar el índice del embed seleccionado
    setOpenDialog(true); // Abrir el modal de confirmación
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Cerrar el modal sin eliminar
    setSelectedIndex(null); // Limpiar el índice del embed seleccionado
  };

  const handleConfirmDelete = async () => {
    if (selectedIndex !== null) {
      try {
        await deleteEmbed(selectedIndex); // Eliminar el embed de la base de datos
        setSnackbarMessage('Embed eliminado exitosamente.');
        setOpenSnackbar(true);
        const updatedEmbeds = await getEmbeds(); // Obtener los embeds actualizados
        setEmbeds(Array.isArray(updatedEmbeds) ? updatedEmbeds : []); // Verificar que updatedEmbeds sea un array
      } catch (error) {
        setSnackbarMessage('Error al eliminar el embed.');
        setOpenSnackbar(true);
        console.error('Error al eliminar el embed:', error);
      }
    }
    handleCloseDialog(); // Cerrar el modal
  };

  // Función para extraer el enlace
  const extractLink = (input) => {
    const fbDirectLinkRegex = /https:\/\/www\.facebook\.com\/[\w.-]+\/posts\/[\w.-]+/;
    const fbEmbedLinkRegex = /<blockquote[^>]*cite="(https:\/\/www\.facebook\.com\/[\w.-]+\/posts\/[\w.-]+)"/;
    const igDirectLinkRegex = /https:\/\/www\.instagram\.com\/p\/[\w.-]+\/?/;
    const igEmbedLinkRegex = /data-instgrm-permalink="(https:\/\/www\.instagram\.com\/p\/[\w.-]+\/?)"/;

    if (fbDirectLinkRegex.test(input)) {
      return input.match(fbDirectLinkRegex)[0];
    } else if (fbEmbedLinkRegex.test(input)) {
      return input.match(fbEmbedLinkRegex)[1];
    }

    if (igDirectLinkRegex.test(input)) {
      return input.match(igDirectLinkRegex)[0];
    } else if (igEmbedLinkRegex.test(input)) {
      return input.match(igEmbedLinkRegex)[1];
    }

    return null; // Si no es válido
  };

  return (
    <Container maxWidth="lg" className="mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Nota explicativa con letra pequeña y tenue */}
      <Typography variant="body2" className="text-gray-500 mb-4 text-center">
        Nota: Puedes pegar directamente el enlace de incrustación de Facebook o Instagram, o copiar todo el código embed. Ambas formas funcionarán igual.
      </Typography>

      {/* Espacio para las imágenes debajo de la nota */}
      <Box className="mb-6 flex justify-center gap-4">
        <img src="./images/embedIG.jpg" alt="Ig" className="w-1/2" />
        <img src="./images/embedFB.jpg" alt="Fb" className="w-1/2" />
      </Box>

      <Typography variant="h5" className="mb-6 text-center">
        Panel de Administración de Embeds
      </Typography>

      {/* Formulario para agregar un embed */}
      <div className="flex gap-4 mb-4">
        <TextField
          label="Enlace del Embed"
          variant="outlined"
          value={newEmbedLink}
          onChange={(e) => setNewEmbedLink(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddEmbed}>
          Agregar
        </Button>
      </div>

      {/* Lista de embeds */}
      <List className="bg-gray-100 rounded-lg">
        {/* Verifica que embeds no sea undefined y que sea un array antes de hacer map */}
        {Array.isArray(embeds) && embeds.length > 0 ? (
          embeds.map((embed, index) => (
            <ListItem key={index} className="flex justify-between">
              <Typography className="max-w-full truncate">{embed.link}</Typography>
              <IconButton onClick={() => handleOpenDialog(embed.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography className="text-center text-gray-500">No hay embeds disponibles.</Typography>
        )}
      </List>

      {/* Snackbar de validación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* Modal de confirmación de eliminación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este embed? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;