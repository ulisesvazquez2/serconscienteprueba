import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Contacto = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleCaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setSnackbarMessage('Por favor, completa todos los campos.');
      setOpenSnackbar(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setSnackbarMessage('Por favor, ingresa un correo electrónico válido.');
      setOpenSnackbar(true);
      return;
    }

    if (!recaptchaToken) {
      setSnackbarMessage('Por favor verifica el CAPTCHA.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'mail', {
        name,
        email,
        message,
        recaptchaToken,
      });

      setSnackbarMessage('Mensaje enviado exitosamente.');
      setOpenSnackbar(true);

      setName('');
      setEmail('');
      setMessage('');
      setRecaptchaToken('');
    } catch (error) {
      setSnackbarMessage('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      setOpenSnackbar(true);
    }
  };

  return (
    <section id="contacto" className="my-32">
      <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
      <div className="container mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Tu Nombre"
            variant="outlined"
            className="col-span-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Tu Email"
            variant="outlined"
            className="col-span-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="¿En qué podemos ayudarte?"
            variant="outlined"
            multiline
            rows={4}
            className="col-span-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Contenedor centrado para reCAPTCHA */}
          <div className="col-span-2 flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </div>
          {/* Botón ajustado */}
          <div className="col-span-2 flex justify-center">
            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '50%', // Ocupa la mitad del ancho del mensaje
              }}
              type="submit"
            >
              Enviar Mensaje
            </Button>
          </div>
        </form>
      </div>

      {/* Snackbar de notificación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </section>
  );
};

export default Contacto;