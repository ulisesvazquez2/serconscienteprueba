import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const PanelCursosTalleres = () => {
    const [cursosTalleres, setCursosTalleres] = useState([]);
    const [newCursoTaller, setNewCursoTaller] = useState({ tipo: "", titulo: "", fechaInicio: "", fechaFin: "", descripcion: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCursoTallerId, setSelectedCursoTallerId] = useState(null);
    const [editCursoTaller, setEditCursoTaller] = useState(null);

    const BACK_URL = process.env.REACT_APP_BACKEND_URL + "cursos_talleres";

    // Función para convertir una fecha al formato 'YYYY-MM-DD'
    const formatDate = (date) => {
        const parsedDate = new Date(date);
        return isNaN(parsedDate) ? "" : parsedDate.toISOString().split('T')[0]; // Retorna la fecha en formato YYYY-MM-DD
    };


    // Obtener cursos/talleres desde el backend
    useEffect(() => {
        const fetchCursosTalleres = async () => {
            try {
                const response = await axios.get(BACK_URL);
                // Aplicamos la función formatDate a las fechas recibidas
                const cursosConFechasFormateadas = response.data.map(cursoTaller => ({
                    ...cursoTaller,
                    fecha_inicio: formatDate(cursoTaller.fecha_inicio),
                    fecha_fin: formatDate(cursoTaller.fecha_fin),
                }));
                setCursosTalleres(cursosConFechasFormateadas);
            } catch (error) {
                console.error("Error al obtener los cursos/talleres", error);
            }
        };

        fetchCursosTalleres();
    }, []);

    // Maneja el agregado de un nuevo curso/taller
    const handleAddCursoTaller = async () => {
        try {
            const { tipo, titulo, fechaInicio, fechaFin, descripcion } = newCursoTaller;
            if (!tipo || !titulo || !fechaInicio || !fechaFin || !descripcion) {
                setSnackbarMessage("Por favor, completa todos los campos");
                setOpenSnackbar(true);
                return;
            }

            setNewCursoTaller({
                ...newCursoTaller,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
            });

            await axios.post(BACK_URL, newCursoTaller);
            setSnackbarMessage("Curso/Taller agregado exitosamente");
            setOpenSnackbar(true);

            // Resetear el formulario
            setNewCursoTaller({ tipo: "", titulo: "", fechaInicio: "", fechaFin: "", descripcion: "" });

            // Recargar los cursos/talleres
            const response = await axios.get(BACK_URL);
            setCursosTalleres(response.data);
        } catch (error) {
            setSnackbarMessage("Error al agregar el curso/taller");
            setOpenSnackbar(true);
        }
    };

    // Maneja la eliminación de un curso/taller
    const handleDeleteCursoTaller = async () => {
        try {
            await axios.delete(`${BACK_URL}/${selectedCursoTallerId}`);
            setSnackbarMessage("Curso/Taller eliminado exitosamente");
            setOpenSnackbar(true);

            // Recargar los cursos/talleres
            const response = await axios.get(BACK_URL);
            setCursosTalleres(response.data);
        } catch (error) {
            setSnackbarMessage("Error al eliminar el curso/taller");
            setOpenSnackbar(true);
        }

        setOpenDialog(false); // Cerrar el modal de confirmación
    };

    // Maneja la edición de un curso/taller
    const handleEditCursoTaller = async () => {
        try {
            const { tipo, titulo, fechaInicio, fechaFin, descripcion } = editCursoTaller;
            if (!tipo || !titulo || !fechaInicio || !fechaFin || !descripcion) {
                setSnackbarMessage("Por favor, completa todos los campos");
                setOpenSnackbar(true);
                return;
            }

            await axios.put(`${BACK_URL}/${selectedCursoTallerId}`, editCursoTaller);
            setSnackbarMessage("Curso/Taller editado exitosamente");
            setOpenSnackbar(true);

            // Recargar los cursos/talleres
            const response = await axios.get(BACK_URL);
            setCursosTalleres(response.data);

            setEditCursoTaller(null); // Limpiar el formulario de edición
            setOpenDialog(false); // Cerrar el modal
        } catch (error) {
            setSnackbarMessage("Error al editar el curso/taller");
            setOpenSnackbar(true);
        }
    };

    const handleOpenDialog = (id, action) => {
        setSelectedCursoTallerId(id);
        const cursoTaller = cursosTalleres.find((item) => item.id === id);

        if (action === "edit") {
            // Parsear las fechas de la edición
            setEditCursoTaller({
                ...cursoTaller,
                fecha_inicio: formatDate(cursoTaller.fecha_inicio),
                fecha_fin: formatDate(cursoTaller.fecha_fin),
                fechaInicio: formatDate(cursoTaller.fecha_inicio),
                fechaFin: formatDate(cursoTaller.fecha_fin),
            });
        }

        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditCursoTaller(null); // Limpiar datos de edición
    };

    return (
        <Container className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full my-5">
            <Typography variant="h5" className="my-6 text-center">
                Panel de Administración de Cursos y Talleres
            </Typography>

            {/* Formulario para agregar un nuevo curso/taller */}
            <div className="flex gap-4 my-6">
                <TextField
                    label="Tipo"
                    variant="outlined"
                    value={newCursoTaller.tipo}
                    onChange={(e) => setNewCursoTaller({ ...newCursoTaller, tipo: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Título"
                    variant="outlined"
                    value={newCursoTaller.titulo}
                    onChange={(e) => setNewCursoTaller({ ...newCursoTaller, titulo: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Fecha de Inicio"
                    variant="outlined"
                    type="date"
                    value={newCursoTaller.fechaInicio}
                    onChange={(e) => setNewCursoTaller({ ...newCursoTaller, fechaInicio: e.target.value })}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Fecha de Fin"
                    variant="outlined"
                    type="date"
                    value={newCursoTaller.fechaFin}
                    onChange={(e) => setNewCursoTaller({ ...newCursoTaller, fechaFin: e.target.value })}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Descripción"
                    variant="outlined"
                    value={newCursoTaller.descripcion}
                    onChange={(e) => setNewCursoTaller({ ...newCursoTaller, descripcion: e.target.value })}
                    fullWidth
                />
                <Button variant="contained" color="primary" className="w-full" onClick={handleAddCursoTaller}>
                    Agregar
                </Button>
            </div>

            {/* Lista de cursos/talleres */}
            <List className="bg-gray-100 rounded-lg">
                {cursosTalleres.map((cursoTaller) => (
                    <ListItem key={cursoTaller.id} className="flex justify-between">
                        <Typography>
                            {cursoTaller.tipo}: {cursoTaller.titulo}
                        </Typography>
                        <div>
                            <IconButton onClick={() => handleOpenDialog(cursoTaller.id, "edit")}  color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleOpenDialog(cursoTaller.id, "delete")} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </ListItem>
                ))}
            </List>

            {/* Snackbar de validación */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />

            {/* Modal de edición/eliminación */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                sx={{ "& .MuiDialogContent-root": { height: '500px', overflowY: 'auto' } }}
            >
                <DialogTitle>{editCursoTaller ? "Editar Curso/Taller" : "Confirmar Eliminación"}</DialogTitle>
                <DialogContent>
                    {editCursoTaller ? (
                        <>
                            <Box sx={{ my: 2 }}>  {/* mb = margin-bottom */}
                                <TextField
                                    label="Tipo"
                                    variant="outlined"
                                    value={editCursoTaller.tipo}
                                    onChange={(e) => setEditCursoTaller({ ...editCursoTaller, tipo: e.target.value })}
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Título"
                                    variant="outlined"
                                    value={editCursoTaller.titulo}
                                    onChange={(e) => setEditCursoTaller({ ...editCursoTaller, titulo: e.target.value })}
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Fecha de Inicio"
                                    variant="outlined"
                                    type="date"
                                    value={editCursoTaller.fecha_inicio}
                                    onChange={(e) => setEditCursoTaller({ ...editCursoTaller, fecha_inicio: e.target.value })}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Fecha de Fin"
                                    variant="outlined"
                                    type="date"
                                    value={editCursoTaller.fecha_fin}
                                    onChange={(e) => setEditCursoTaller({ ...editCursoTaller, fecha_fin: e.target.value })}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>

                            <Box sx={{ mb: 2}}>
                                <TextField
                                    label="Descripción"
                                    variant="outlined"
                                    value={editCursoTaller.descripcion}
                                    onChange={(e) => setEditCursoTaller({ ...editCursoTaller, descripcion: e.target.value })}
                                    fullWidth
                                />
                            </Box>
                        </>
                    ) : (
                        <Typography>
                            ¿Estás seguro de que deseas eliminar este curso/taller?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    {editCursoTaller ? (
                        <Button onClick={handleEditCursoTaller} color="primary">
                            Guardar cambios
                        </Button>
                    ) : (
                        <Button onClick={handleDeleteCursoTaller} color="secondary">
                            Eliminar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PanelCursosTalleres;
