import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const PanelEventosTL = () => {
    const [eventos, setEventos] = useState([]);
    const [newEvento, setNewEvento] = useState({ titulo: "", year: "", descripcion: "", color: "primary" });
    const [editEvento, setEditEvento] = useState({ id: "", titulo: "", year: "", descripcion: "", color: "primary" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEventoId, setSelectedEventoId] = useState(null);

    const BACK_URL = process.env.REACT_APP_BACKEND_URL + "eventos_timeline";

    useEffect(() => {
        // Obtener eventos desde la base de datos
        const fetchEventos = async () => {
            try {
                const response = await axios.get(BACK_URL);
                setEventos(response.data);
            } catch (error) {
                console.error("Error al obtener los eventos", error);
            }
        };

        fetchEventos();
    }, []);

    const handleAddEvento = async () => {
        try {
            const { titulo, year, descripcion, color } = newEvento;
            if (!titulo || !year || !descripcion) {
                setSnackbarMessage("Por favor, completa todos los campos");
                setOpenSnackbar(true);
                return;
            }

            await axios.post(BACK_URL, newEvento);
            setSnackbarMessage("Evento agregado exitosamente");
            setOpenSnackbar(true);

            // Resetear el formulario
            setNewEvento({ titulo: "", year: "", descripcion: "", color: "primary" });

            // Volver a cargar los eventos
            const response = await axios.get(BACK_URL);
            setEventos(response.data);
        } catch (error) {
            setSnackbarMessage("Error al agregar el evento");
            setOpenSnackbar(true);
        }
    };

    const handleDeleteEvento = async () => {
        try {
            await axios.delete(BACK_URL + `/${selectedEventoId}`);
            setSnackbarMessage("Evento eliminado exitosamente");
            setOpenSnackbar(true);

            // Volver a cargar los eventos
            const response = await axios.get(BACK_URL);
            setEventos(response.data);
        } catch (error) {
            setSnackbarMessage("Error al eliminar el evento");
            setOpenSnackbar(true);
        }

        setOpenDialog(false); // Cerrar el modal de confirmación
    };

    const handleEditEvento = async () => {
        try {
            const { id, titulo, year, descripcion, color } = editEvento;
            if (!titulo || !year || !descripcion) {
                setSnackbarMessage("Por favor, completa todos los campos");
                setOpenSnackbar(true);
                return;
            }

            await axios.put(BACK_URL + `/${id}`, editEvento);
            setSnackbarMessage("Evento actualizado exitosamente");
            setOpenSnackbar(true);

            // Volver a cargar los eventos
            const response = await axios.get(BACK_URL);
            setEventos(response.data);
            setOpenEditDialog(false); // Cerrar el modal de edición
        } catch (error) {
            setSnackbarMessage("Error al actualizar el evento");
            setOpenSnackbar(true);
        }
    };

    const handleOpenDialog = (id) => {
        setSelectedEventoId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenEditDialog = (evento) => {
        setEditEvento(evento); // Seteamos los datos del evento en el formulario de edición
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    return (
        <Container className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full my-5">
            <Typography variant="h5" className="mb-6 text-center">
                Panel de Administración de Eventos de la Línea de Tiempo
            </Typography>

            {/* Formulario para agregar un nuevo evento */}
            <div className="flex gap-4 my-6">
                <TextField
                    label="Título"
                    variant="outlined"
                    value={newEvento.titulo}
                    onChange={(e) => setNewEvento({ ...newEvento, titulo: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Año"
                    variant="outlined"
                    value={newEvento.year}
                    onChange={(e) => setNewEvento({ ...newEvento, year: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Descripción"
                    variant="outlined"
                    value={newEvento.descripcion}
                    onChange={(e) => setNewEvento({ ...newEvento, descripcion: e.target.value })}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel></InputLabel>
                    <Select
                        name=""
                        value={newEvento.color}
                        onChange={(e) => setNewEvento({ ...newEvento, color: e.target.value })}
                        required
                    >
                        <MenuItem value="primary">Azul</MenuItem>
                        <MenuItem value="secondary">Morado</MenuItem>
                        <MenuItem value="success">Verde</MenuItem>
                        <MenuItem value="warning">Naranja</MenuItem>
                        <MenuItem value="error">Rojo</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" className="w-full" onClick={handleAddEvento}>
                    Agregar
                </Button>
            </div>

            {/* Lista de eventos */}
            <List className="bg-gray-100 rounded-lg">
                {Array.isArray(eventos) && eventos.length > 0 ? (
                    eventos.map((evento, index) => (
                        <ListItem key={index} className="flex justify-between">
                            <Typography className="max-w-full truncate">
                                {evento.titulo} - {evento.year}
                            </Typography>
                            <div>
                                <IconButton onClick={() => handleOpenEditDialog(evento)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDialog(evento.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))
                ) : (
                    <Typography className="text-center text-gray-500">No hay eventos disponibles.</Typography>
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
                        ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteEvento} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de edición de evento */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Editar Evento</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Título"
                        variant="outlined"
                        value={editEvento.titulo}
                        onChange={(e) => setEditEvento({ ...editEvento, titulo: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Año"
                        variant="outlined"
                        value={editEvento.year}
                        onChange={(e) => setEditEvento({ ...editEvento, year: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        value={editEvento.descripcion}
                        onChange={(e) => setEditEvento({ ...editEvento, descripcion: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth>
                        <InputLabel></InputLabel>
                        <Select
                            name="color"
                            value={editEvento.color}
                            onChange={(e) => setEditEvento({ ...editEvento, color: e.target.value })}
                            required
                        >
                            <MenuItem value="primary">Azul</MenuItem>
                            <MenuItem value="secondary">Morado</MenuItem>
                            <MenuItem value="success">Verde</MenuItem>
                            <MenuItem value="warning">Naranja</MenuItem>
                            <MenuItem value="error">Rojo</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleEditEvento} color="secondary">
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PanelEventosTL;