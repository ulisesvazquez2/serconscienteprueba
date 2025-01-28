import React from 'react';
import Contacto from '../components/Contacto';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuienesSomos from '../components/QuienesSomos';
import MapComponent from '../components/MapComponent';

const ContactoPage = () => {
    return (
        <div className="">
            <Header />
            <QuienesSomos />
            <Contacto />
            <MapComponent />
            <Footer />
        </div>
    );
};

export default ContactoPage;