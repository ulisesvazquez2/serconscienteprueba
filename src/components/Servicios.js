import React, {useState, useEffect} from "react";
import { Button, Card, Typography } from "@mui/material";
import axios from "axios";


const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  
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
  

const contenidos = [
  { tipo: "video", src: "/videos/peace.mp4", alt: "Video Dinámico" },
  { tipo: "imagen", src: "/gifs/Placeholder2.gif", alt: "Imagen Dinámica" },
  { tipo: "gif", src: "/gifs/Placeholder.gif", alt: "GIF Dinámico" },
];

  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-12 px-4">
        {/* Columna Izquierda: Encabezado y Tarjetas */}
        <div className="lg:w-2/3">
          {/* Encabezado */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold">Nuestros Servicios</h2>
            <p className="my-8 text-black mt-4">
              Descubre todo lo que ofrecemos para tu bienestar
            </p>
            <Button
              variant="contained"
              className="mt-6 text-white px-6 py-3"
              style={{
                backgroundColor: "black",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2d2d2d")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
            >
              Reservar Sesión
            </Button>
          </div>

          {/* Grid de Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicios.map((servicio, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <Card className="w-full h-96 shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden">
                  {/* Etiqueta de Título */}
                  <div className="absolute top-0 left-0 bg-black text-white text-sm px-3 py-1 rounded-br-lg z-10">
                    {servicio.titulo}
                  </div>
                  {/* Imagen */}
                  <img
                    src={servicio.rutaImagen}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                  />
                  {/* Texto en Hover */}
                  <div className="absolute inset-0 bg-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 z-20">
                    <Typography
                      variant="h6"
                      className="text-xl font-bold text-black mb-2"
                    >
                      {servicio.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-base text-gray-700 text-center"
                    >
                      {servicio.detalle}
                    </Typography>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Contenidos Dinámicos */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {contenidos.map((contenido, index) => {
            if (contenido.tipo === "imagen") {
              return (
                <img
                  key={index}
                  src={contenido.src}
                  alt={contenido.alt}
                  className="w-full h-auto object-cover shadow-lg rounded sm:h-1/2"
                />
              );
            }
            if (contenido.tipo === "gif") {
              return (
                <img
                  key={index}
                  src={contenido.src}
                  alt={contenido.alt}
                  className="w-full h-auto object-cover shadow-lg rounded sm:h-1/2"
                />
              );
            }
            if (contenido.tipo === "video") {
              return (
                <video
                  key={index}
                  src={contenido.src}
                  controls
                  
                  autoPlay
                  loop
                  className="w-full h-auto object-cover shadow-lg rounded sm:h-1/2"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default Servicios;