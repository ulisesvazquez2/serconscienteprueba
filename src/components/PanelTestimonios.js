import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const PanelTestimonios = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [newTestimonio, setNewTestimonio] = useState({ nombre: "", rol: "", mensaje: "", emoji: "" });
  const [editTestimonio, setEditTestimonio] = useState({ id: "", nombre: "", rol: "", mensaje: "", emoji: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTestimonioId, setSelectedTestimonioId] = useState(null);

  const BACK_URL = process.env.REACT_APP_BACKEND_URL + "testimonios";

  useEffect(() => {
    // Llamada para obtener los testimonios desde el backend
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get(BACK_URL);
        setTestimonios(response.data);
      } catch (error) {
        console.error("Error al obtener los testimonios", error);
      }
    };

    fetchTestimonios();
  }, []);

  const handleAddTestimonio = async () => {
    try {
      const { nombre, rol, mensaje, emoji } = newTestimonio;
      if (!nombre || !rol || !mensaje || !emoji) {
        setSnackbarMessage("Por favor, completa todos los campos");
        setOpenSnackbar(true);
        return;
      }

      await axios.post(BACK_URL, newTestimonio);
      setSnackbarMessage("Testimonio agregado exitosamente");
      setOpenSnackbar(true);

      // Resetear el formulario
      setNewTestimonio({ nombre: "", rol: "", mensaje: "", emoji: "" });

      // Volver a cargar los testimonios
      const response = await axios.get(BACK_URL);
      setTestimonios(response.data);
    } catch (error) {
      setSnackbarMessage("Error al agregar el testimonio");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteTestimonio = async () => {
    try {
      await axios.delete(BACK_URL + `/${selectedTestimonioId}`);
      setSnackbarMessage("Testimonio eliminado exitosamente");
      setOpenSnackbar(true);

      // Volver a cargar los testimonios
      const response = await axios.get(BACK_URL);
      setTestimonios(response.data);
    } catch (error) {
      setSnackbarMessage("Error al eliminar el testimonio");
      setOpenSnackbar(true);
    }

    setOpenDialog(false); // Cerrar el modal de confirmación
  };

  const handleEditTestimonio = async () => {
    try {
      const { id, nombre, rol, mensaje, emoji } = editTestimonio;
      if (!nombre || !rol || !mensaje || !emoji) {
        setSnackbarMessage("Por favor, completa todos los campos");
        setOpenSnackbar(true);
        return;
      }

      await axios.put(BACK_URL + `/${id}`, editTestimonio);
      setSnackbarMessage("Testimonio actualizado exitosamente");
      setOpenSnackbar(true);

      // Volver a cargar los testimonios
      const response = await axios.get(BACK_URL);
      setTestimonios(response.data);
      setOpenEditDialog(false); // Cerrar el modal de edición
    } catch (error) {
      setSnackbarMessage("Error al actualizar el testimonio");
      setOpenSnackbar(true);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedTestimonioId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = (testimonio) => {
    setEditTestimonio(testimonio); // Seteamos los datos del testimonio en el formulario de edición
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Container className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full my-5">
      <Typography variant="h5" className="mb-6 text-center">
        Panel de Administración de Testimonios
      </Typography>

      {/* Enlace a Emojipedia */}
      <Typography variant="body2" className="text-center my-10">
        Puedes encontrar una variedad de emojis en{" "}
        <a
          href="https://emojipedia.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3f51b5", textDecoration: "underline", margin: "5px" }}
        >
          Emojipedia
        </a>
      </Typography>

      {/* Formulario para agregar un nuevo testimonio */}
      <div className="flex gap-4 my-6"> {/* Ajusté el margin */}
        <TextField
          label="Nombre"
          variant="outlined"
          value={newTestimonio.nombre}
          onChange={(e) => setNewTestimonio({ ...newTestimonio, nombre: e.target.value })}
          fullWidth
        />
        <TextField
          label="Rol"
          variant="outlined"
          value={newTestimonio.rol}
          onChange={(e) => setNewTestimonio({ ...newTestimonio, rol: e.target.value })}
          fullWidth
        />
        <TextField
          label="Mensaje"
          variant="outlined"
          value={newTestimonio.mensaje}
          onChange={(e) => setNewTestimonio({ ...newTestimonio, mensaje: e.target.value })}
          fullWidth
        />
        <TextField
          label="Emoji"
          variant="outlined"
          value={newTestimonio.emoji}
          onChange={(e) => setNewTestimonio({ ...newTestimonio, emoji: e.target.value })}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTestimonio}
          className="w-full" 
        >
          Agregar
        </Button>
      </div>

      {/* Lista de testimonios */}
      <List className="bg-gray-100 rounded-lg">
        {Array.isArray(testimonios) && testimonios.length > 0 ? (
          testimonios.map((testimonio, index) => (
            <ListItem key={index} className="flex justify-between">
              <Typography className="max-w-full truncate">
                {testimonio.nombre}: {testimonio.mensaje} {testimonio.emoji}
              </Typography>
              <div>
                <IconButton onClick={() => handleOpenEditDialog(testimonio)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDialog(testimonio.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>
          ))
        ) : (
          <Typography className="text-center text-gray-500">No hay testimonios disponibles.</Typography>
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
            ¿Estás seguro de que deseas eliminar este testimonio? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTestimonio} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edición de testimonio */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Testimonio</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            value={editTestimonio.nombre}
            onChange={(e) => setEditTestimonio({ ...editTestimonio, nombre: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rol"
            variant="outlined"
            value={editTestimonio.rol}
            onChange={(e) => setEditTestimonio({ ...editTestimonio, rol: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mensaje"
            variant="outlined"
            value={editTestimonio.mensaje}
            onChange={(e) => setEditTestimonio({ ...editTestimonio, mensaje: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Emoji"
            variant="outlined"
            value={editTestimonio.emoji}
            onChange={(e) => setEditTestimonio({ ...editTestimonio, emoji: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditTestimonio} color="secondary">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PanelTestimonios;