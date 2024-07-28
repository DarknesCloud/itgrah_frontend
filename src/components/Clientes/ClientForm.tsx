import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

interface FormData {
  name: string;
  lastname: string;
  rtn: string;
  direccion: string;
}

export const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    rtn: '',
    direccion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/clientes',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Cliente agregado:', response.data);
      setFormData({
        name: '',
        lastname: '',
        rtn: '',
        direccion: '',
      });
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Cliente
        </Typography>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="RTN"
          name="rtn"
          value={formData.rtn}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};
