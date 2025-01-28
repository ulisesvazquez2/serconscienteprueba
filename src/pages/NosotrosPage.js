import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MisionVision from '../components/MisionVision';
import TimeLine from '../components/TimeLine';
import MapComponent from '../components/MapComponent';

const NosotrosPage = () => {
    return (
        <div>
            <Header />
            <TimeLine />
            <MisionVision />
            <MapComponent />
            <Footer />
        </div>
    );
};

export default NosotrosPage;