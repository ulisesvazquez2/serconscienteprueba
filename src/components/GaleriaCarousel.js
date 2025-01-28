import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GaleriaCarousel = () => {
  const slides = [
    {
      src: "/images/psicoanalisisExample.jpg",
      alt: "Psicoanálisis",
      legend:
        "El psicoanálisis explora los procesos inconscientes y cómo las experiencias pasadas influyen en la vida actual.",
    },
    {
      src: "/images/Placeholder1.png",
      alt: "Placeholder 1",
      legend: "Texto explicativo para Placeholder 1",
    },
    {
      src: "/images/Placeholder2.jpg",
      alt: "Placeholder 2",
      legend: "Texto explicativo para Placeholder 2",
    },
    {
      src: "/images/Placeholder3.jpeg",
      alt: "Placeholder 3",
      legend: "Texto explicativo para Placeholder 3",
    },
    {
      src: "/images/tarotExample.jpeg",
      alt: "Tarot",
      legend: "El tarot como herramienta para explorar la psique y tomar decisiones.",
    },
  ];

  // Función que ajusta la altura de todas las imágenes a una cantidad de rems
  const adjustImageHeight = () => {
    const images = document.querySelectorAll(".carousel .slide img");
    images.forEach((img) => {
      img.style.height = "30rem"; 
      img.style.objectFit = "cover"; 
    });
  };

  // Llamamos a la función al montar el componente
  useEffect(() => {
    adjustImageHeight();
  }, []);

  return (
    <section>
      <Carousel
        autoPlay
        interval={5000}
        transitionTime={2000}
        infiniteLoop
        showThumbs={true}
        showStatus={false}
        loop
      >
        {slides.map((slide, index) => (
          <div key={index} >
            {/* Imagen */}
            <img src={slide.src} alt={slide.alt}/>

            {/* Texto explicativo en el legend */}
            <p className="legend">{slide.legend}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default GaleriaCarousel;
