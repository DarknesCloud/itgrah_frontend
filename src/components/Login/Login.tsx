import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Link,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        formData
      );
      localStorage.setItem('token', response.data.access_token);

      // Obtener datos del usuario
      const userResponse = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify(userResponse.data));
      setError(null);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="contrasena"
          type="password"
          value={formData.contrasena}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
      <Box mt={2}>
        <Typography variant="body2">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" variant="body2" color="primary">
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
