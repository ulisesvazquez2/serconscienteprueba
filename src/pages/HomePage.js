import React from 'react';
import EmbedList from '../components/EmbedList';
import Header from '../components/Header';
import Hero from '../components/Hero';
import QuienesSomos from '../components/QuienesSomos';
import Servicios from '../components/Servicios';
import GaleriaCarousel from '../components/GaleriaCarousel';
import SocialCarousel from '../components/SocialCarousel';
import Testimonios from '../components/Testimonios';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import CursosTalleres from '../components/CursosTalleres';

const HomePage = ({ embeds }) => {
    return (
        <div className="">
            <Header />
            <GaleriaCarousel />
            <QuienesSomos />
            <Testimonios />
            <Servicios />
            <CursosTalleres />
            <SocialCarousel />
            <Contacto />
            <MapComponent />
            <Footer />
        </div>
    );
};

export default HomePage;