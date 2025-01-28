import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";

const Testimonios = () => {
  // Estado para almacenar los testimonios
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const BACK_URL = process.env.REACT_APP_BACKEND_URL + "testimonios"

  useEffect(() => {
    // Función para obtener los testimonios desde la API
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get(BACK_URL); // Reemplaza con tu URL
        setTestimonios(response.data);
      } catch (error) {
        setError("Hubo un problema al cargar los testimonios.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  if (loading) {
    return <p>Cargando testimonios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section id="testimonios" className="py-16 text-center">
      {/* Título */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold">Testimonios</h2>
        <p className="text-gray-500 mt-2">
          Lo que dicen quienes han confiado en nosotros
        </p>
      </div>

      {/* Carrusel Responsivo */}
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {testimonios.map((testimonio, index) => (
            <SwiperSlide key={index}>
              <Card
                className="flex flex-col items-center p-6 shadow-lg border border-gray-300 rounded-lg transition-transform duration-300 bg-white"
              >
                {/* Emoji Avatar */}
                <Avatar
                  className="bg-gray-200 text-3xl"
                  sx={{ width: 56, height: 56 }}
                >
                  {testimonio.emoji}
                </Avatar>

                {/* Contenido */}
                <CardContent className="text-center">
                  <Typography
                    variant="h6"
                    className="font-semibold mt-4 text-black"
                  >
                    {testimonio.nombre}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {testimonio.rol}
                  </Typography>
                  <Typography
                    variant="body3"
                    className="mt-4 text-black font-bold text-xl"
                  >
                    {testimonio.mensaje}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonios;