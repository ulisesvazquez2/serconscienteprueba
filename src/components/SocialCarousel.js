import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import Carousel from "react-spring-3d-carousel";
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'react-spring';

const SocialMediaEmbedsCarousel = () => {
  const [embeds, setEmbeds] = useState([]); // Inicializamos como un arreglo vacío
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const BACK_URL = process.env.REACT_APP_BACKEND_URL + "embeds"

  // Llamada al API para obtener los embeds
  useEffect(() => {
    const fetchEmbeds = async () => {
      try {
        // Llamada al endpoint de la API para obtener los embeds
        const response = await axios.get(BACK_URL);  // Asegúrate de que la URL es correcta
        const data = response.data;
        setEmbeds(data); // Establecemos los embeds obtenidos
        setLoading(false); // Finalizamos la carga
      } catch (error) {
        console.error('Error al obtener los embeds', error);
        setLoading(false); // Finalizamos la carga incluso si hubo error
      }
    };

    fetchEmbeds();
  }, []);  // El array vacío asegura que solo se ejecute una vez al montarse el componente

  // Verificamos si `embeds` está vacío o no es un array
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Aseguramos que `embeds` siempre sea un array
  const validEmbeds = Array.isArray(embeds) ? embeds : [];

  const cards = validEmbeds.map((embed, index) => {
    return {
      key: uuidv4(),
      content: (
        <div key={index}>
          {/* Card for each social media embed */}
          <Card className="max-w-xl mx-auto shadow-lg">
            <CardContent>
              <div className="embed-container">
                {/* Verificamos el tipo de embed y renderizamos el componente correspondiente */}
                {embed.link.includes('facebook') ? (
                  <FacebookEmbed url={embed.link} />
                ) : embed.link.includes('instagram') ? (
                  <InstagramEmbed url={embed.link} />
                ) : (
                  <p>Embed no válido</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    };
  });

  return (
    <section className="my-10" style={{ marginBottom: '40px' }}>
      {/* Carousel 3D for the social media embeds */}
      <div style={{ width: '90%', height: '800px', margin: '0 auto' }}>
        <Carousel
          slides={cards}
          offsetRadius={2}
          showNavigation={true}
          animationConfig={config.gentle} // Configuración de animación
        />
      </div>
    </section>
  );
};

export default SocialMediaEmbedsCarousel;