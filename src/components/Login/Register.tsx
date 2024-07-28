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

export const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });

  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/registro',
        formData
      );
      console.log(response.data);
      setSuccess(true);
      setFormData({ nombre: '', correo: '', contrasena: '' }); // Limpiar campos del formulario
      setTimeout(() => {
        setSuccess(null);
        navigate('/login'); // Redirigir a la página de inicio de sesión después de 3 segundos
      }, 3000); // Ocultar mensaje después de 3 segundos y redirigir
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registrar
      </Typography>
      {success === true && (
        <Alert severity="success">
          ¡Registro exitoso! Redirigiendo a la página de inicio de sesión...
        </Alert>
      )}
      {success === false && (
        <Alert severity="error">
          Error en el registro. Inténtalo de nuevo.
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
          Registrar
        </Button>
      </form>
      <Box mt={2}>
        <Typography variant="body2">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" variant="body2" color="primary">
            Inicia sesión aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
