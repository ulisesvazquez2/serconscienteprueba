import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CursosTalleres from '../components/CursosTalleres';
import SocialMediaEmbedsCarousel from '../components/SocialCarousel';
import Testimonios from '../components/Testimonios';

const TalleresPage = () => {
  return (
    <div>
      <Header />
      <CursosTalleres />
      <SocialMediaEmbedsCarousel />
      <Testimonios />
      <Footer />
    </div>
  );
};

export default TalleresPage;