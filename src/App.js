import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import ServiciosPage from './pages/ServiciosPage';
import TalleresPage from './pages/TalleresPage';
import ContactoPage from './pages/ContactoPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [embeds, setEmbeds] = useState([]);

  const handleLogin = (username, password) => {
    console.log('Login attempt:', username, password);
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    }
  };

  const handleAddEmbed = (embedLink) => {
    setEmbeds([...embeds, embedLink]);
  };

  const handleDeleteEmbed = (index) => {
    setEmbeds(embeds.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/talleres" element={<TalleresPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/admin" element={<AdminPage embeds={embeds} onAddEmbed={handleAddEmbed} onDeleteEmbed={handleDeleteEmbed} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={isLoggedIn ? (
            <AdminPage embeds={embeds} onAddEmbed={handleAddEmbed} onDeleteEmbed={handleDeleteEmbed} />
          ) : (
            <Navigate to="/login" replace />  // Redirige si no está logueado
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;