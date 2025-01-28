import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook para la navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      console.log('Attempting to log in', username, password); // Verificación
      onLogin(username, password);
      
      // Redirigir a la página de admin después de un login exitoso
      if (username === 'admin' && password === 'password') {
        navigate('/admin');  // Redirige a /admin
      }
    }
  };

  return (
    <Container maxWidth="xs" className="mt-20 p-6 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-center mb-6">
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Usuario"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
