import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const PanelServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [newServicio, setNewServicio] = useState({ titulo: "", descripcion: "", detalle: "", rutaImagen: "" });
  const [editServicio, setEditServicio] = useState({ id: "", titulo: "", descripcion: "", detalle: "", rutaImagen: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedServicioId, setSelectedServicioId] = useState(null);

  const BACK_URL = process.env.REACT_APP_BACKEND_URL + "servicios";

  useEffect(() => {
    // Llamada para obtener los servicios desde el backend
    const fetchServicios = async () => {
      try {
        const response = await axios.get(BACK_URL);
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios", error);
      }
    };

    fetchServicios();
  }, []);

  const handleAddServicio = async () => {
    try {
      const { titulo, descripcion, detalle, rutaImagen } = newServicio;
      if (!titulo || !descripcion || !detalle || !rutaImagen) {
        setSnackbarMessage("Por favor, completa todos los campos");
        setOpenSnackbar(true);
        return;
      }

      await axios.post(BACK_URL, newServicio);
      setSnackbarMessage("Servicio agregado exitosamente");
      setOpenSnackbar(true);

      // Resetear el formulario
      setNewServicio({ titulo: "", descripcion: "", detalle: "", rutaImagen: "" });

      // Volver a cargar los servicios
      const response = await axios.get(BACK_URL);
      setServicios(response.data);
    } catch (error) {
      setSnackbarMessage("Error al agregar el servicio");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteServicio = async () => {
    try {
      await axios.delete(BACK_URL + `/${selectedServicioId}`);
      setSnackbarMessage("Servicio eliminado exitosamente");
      setOpenSnackbar(true);

      // Volver a cargar los servicios
      const response = await axios.get(BACK_URL);
      setServicios(response.data);
    } catch (error) {
      setSnackbarMessage("Error al eliminar el servicio");
      setOpenSnackbar(true);
    }

    setOpenDialog(false); // Cerrar el modal de confirmación
  };

  const handleEditServicio = async () => {
    try {
      const { id, titulo, descripcion, detalle, rutaImagen } = editServicio;
      if (!titulo || !descripcion || !detalle || !rutaImagen) {
        setSnackbarMessage("Por favor, completa todos los campos");
        setOpenSnackbar(true);
        return;
      }

      await axios.put(BACK_URL + `/${id}`, editServicio);
      setSnackbarMessage("Servicio actualizado exitosamente");
      setOpenSnackbar(true);

      // Volver a cargar los servicios
      const response = await axios.get(BACK_URL);
      setServicios(response.data);
      setOpenEditDialog(false); // Cerrar el modal de edición
    } catch (error) {
      setSnackbarMessage("Error al actualizar el servicio");
      setOpenSnackbar(true);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedServicioId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = (servicio) => {
    setEditServicio(servicio); // Seteamos los datos del servicio en el formulario de edición
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Container className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full my-5">
      <Typography variant="h5" className="mb-6 text-center">
        Panel de Administración de Servicios
      </Typography>

      {/* Formulario para agregar un nuevo servicio */}
      <div className="flex gap-4 mb-4">
        <TextField
          label="Título"
          variant="outlined"
          value={newServicio.titulo}
          onChange={(e) => setNewServicio({ ...newServicio, titulo: e.target.value })}
          fullWidth
        />
        <TextField
          label="Descripción"
          variant="outlined"
          value={newServicio.descripcion}
          onChange={(e) => setNewServicio({ ...newServicio, descripcion: e.target.value })}
          fullWidth
        />
        <TextField
          label="Detalle"
          variant="outlined"
          value={newServicio.detalle}
          onChange={(e) => setNewServicio({ ...newServicio, detalle: e.target.value })}
          fullWidth
        />
        <TextField
          label="Imagen"
          variant="outlined"
          value={newServicio.rutaImagen}
          onChange={(e) => setNewServicio({ ...newServicio, rutaImagen: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" className="w-full" onClick={handleAddServicio}>
          Agregar
        </Button>
      </div>

      {/* Lista de servicios */}
      <List className="bg-gray-100 rounded-lg">
        {Array.isArray(servicios) && servicios.length > 0 ? (
          servicios.map((servicio, index) => (
            <ListItem key={index} className="flex justify-between">
              <Typography className="max-w-full truncate">
                {servicio.titulo}: {servicio.descripcion}
              </Typography>
              <div>
                <IconButton onClick={() => handleOpenEditDialog(servicio)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDialog(servicio.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>
          ))
        ) : (
          <Typography className="text-center text-gray-500">No hay servicios disponibles.</Typography>
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
            ¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteServicio} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edición de servicio */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Servicio</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            variant="outlined"
            value={editServicio.titulo}
            onChange={(e) => setEditServicio({ ...editServicio, titulo: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            variant="outlined"
            value={editServicio.descripcion}
            onChange={(e) => setEditServicio({ ...editServicio, descripcion: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Detalle"
            variant="outlined"
            value={editServicio.detalle}
            onChange={(e) => setEditServicio({ ...editServicio, detalle: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ruta de la Imagen"
            variant="outlined"
            value={editServicio.rutaImagen}
            onChange={(e) => setEditServicio({ ...editServicio, rutaImagen: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditServicio} color="secondary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PanelServicios;