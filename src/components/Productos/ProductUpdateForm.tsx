// src/components/ProductUpdateForm.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  stock: string;
  precio: string;
  total: string;
}

export const ProductUpdateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    stock: '',
    precio: '',
    total: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/productos/${id}`
        );
        setFormData(response.data.producto);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      await axios.put(`http://localhost:8000/api/productos/${id}`, formData);
      navigate('/productos'); // Redirige a la lista de productos
    } catch (err) {
      setError('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
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
          Actualizar Producto
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
          Actualizar
        </Button>
      </Box>
    </Container>
  );
};
