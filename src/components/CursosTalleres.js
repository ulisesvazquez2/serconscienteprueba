import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Contacto from "./Contacto";
import axios from "axios";


const CursosTalleres = () => {

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "" : parsedDate.toISOString().split('T')[0]; // Retorna la fecha en formato YYYY-MM-DD
  };

  const [cursosTalleres, setCursosTalleres] = useState([]); // Estado para almacenar los cursos y talleres
  const BACK_URL = process.env.REACT_APP_BACKEND_URL + "cursos_talleres";

  useEffect(() => {
    const fetchCursosTalleres = async () => {
      try {
        const response = await axios.get(BACK_URL);
        setCursosTalleres(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos/talleres:", error);
      }
    };

    fetchCursosTalleres();
  }, []);

  const [open, setOpen] = useState(false); // Estado para manejar la apertura del modal

  const handleClickOpen = () => {
    setOpen(true); // Abrir el modal
  };

  const handleClose = () => {
    setOpen(false); // Cerrar el modal
  };

  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-12 px-4">
        {/* Columna Izquierda: Encabezado y Cards de Cursos/Talleres */}
        <div className="">
          {/* Encabezado */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold">Nuestros Cursos y Talleres</h2>
            <p className="my-8 text-black mt-4">
              Explora nuestras ofertas de formación y desarrollo personal
            </p>
            <Button
              variant="contained"
              className="mt-6 text-white px-6 py-3"
              style={{
                backgroundColor: 'black',
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1A202C")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
              onClick={handleClickOpen} // Abre el modal al hacer clic
            >
              Inscribirse
            </Button>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cursosTalleres.map(
              cursoTaller => {
                cursoTaller.fechaInicio = formatDate(cursoTaller.fecha_inicio);
                cursoTaller.fechaFin = formatDate(cursoTaller.fecha_fin);
              }
            )}
            {cursosTalleres.map((cursoTaller, index) => (
              <div key={index} className="group relative">
                {/* Card */}
              <Card
                  className="w-full h-full bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden"
                  >
                  {/* Etiqueta de Tipo */}
                  <div className="absolute top-0 left-0 bg-black text-white text-sm px-3 py-1 rounded-br-lg z-10">
                    {cursoTaller.tipo}
                  </div>

                  {/* Contenido */}
                  <CardContent className="relative z-10 p-6 top-5">
                    <Typography variant="h6" component="div" className="font-semibold text-xl text-gray-800 mb-3">
                      {cursoTaller.titulo}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-6">
                      {cursoTaller.descripcion}
                    </Typography>

                    <div className="mt-4 text-gray-500">
                      <Typography variant="body2" className="font-semibold text-gray-800">
                        <strong>Inicio:</strong> {formatDate(cursoTaller.fechaInicio)}
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-gray-800">
                        <strong>Fin:</strong> {formatDate(cursoTaller.fechaFin)}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para el Formulario de Contacto */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Inscripción</DialogTitle>
          <DialogContent>
            <Contacto /> {/* Aquí mostramos el componente Contacto dentro del modal */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default CursosTalleres;