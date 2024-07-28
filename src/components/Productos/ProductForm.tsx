import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

interface FormData {
  name: string;
  stock: string;
  precio: string;
  total: string;
}

export const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    stock: '',
    precio: '',
    total: '',
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
        'http://localhost:8000/api/productos',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Producto agregado:', response.data);
      setFormData({
        name: '',
        stock: '',
        precio: '',
        total: '',
      });
    } catch (error) {
      console.error('Error al agregar producto:', error);
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
          Agregar Producto
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
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Total"
          name="total"
          value={formData.total}
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
