import React from "react";
import { Link } from "react-router-dom"; // Importa el componente Link

const QuienesSomos = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-around items-center bg-white py-12 px-8 my-6">
      {/* Contenido izquierdo */}
      <div className="flex items-center lg:mr-8 xl:mr-12">
        {/* Imagen circular (placeholder) */}
        <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
        {/* Texto */}
        <div>
          <h2 className="text-2xl font-bold">Descubre Quiénes Somos</h2>
          <div className="flex space-x-1 md:space-x-2 lg:space-x-2 mt-2">
            <span className="text-sm bg-gray-200 px-3 py-1 rounded">Misión</span>
            <span className="text-sm bg-gray-200 px-3 py-1 rounded">Visión</span>
            <span className="text-sm bg-gray-200 px-3 py-1 rounded">Valores</span>
          </div>
          <p className="mt-4 text-black">
            Conoce más acerca de la misión y visión que nos guían en Ser Consciente.
          </p>
        </div>
      </div>

      {/* Botón derecho */}
      <div className="mt-6 lg:mt-0">
        {/* Usando el Link de React Router */}
        <Link
          to="/nosotros"  // Define la ruta hacia NosotrosPage.js
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
        >
          Leer Más
        </Link>
      </div>
    </section>
  );
};

export default QuienesSomos;