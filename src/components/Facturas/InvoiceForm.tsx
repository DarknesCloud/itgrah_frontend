import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

interface Client {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  precio: number;
  stock: number;
}

export const InvoiceForm: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    cliente: '',
    tipo_factura: '',
    producto: '',
    precio: '',
    cantidad: '',
    subtotal: '',
    total: '',
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clientes/');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/productos/'
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productName = e.target.value;
    const product = products.find((p) => p.name === productName);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        ...formData,
        producto: productName,
        precio: product.precio.toString(),
        cantidad: '',
        subtotal: '',
        total: '',
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (selectedProduct && (quantity < 1 || quantity > selectedProduct.stock)) {
      alert(`La cantidad debe estar entre 1 y ${selectedProduct.stock}`);
      return;
    }
    const subtotal = selectedProduct ? quantity * selectedProduct.precio : 0;
    const total = subtotal + subtotal * 0.15;
    setFormData({
      ...formData,
      cantidad: e.target.value,
      subtotal: subtotal.toString(),
      total: total.toString(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/facturas',
        formData
      );
      console.log('Factura creada:', response.data);
      // Reset form fields
      setFormData({
        cliente: '',
        tipo_factura: '',
        producto: '',
        precio: '',
        cantidad: '',
        subtotal: '',
        total: '',
      });
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <Container
      maxWidth="md"
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
          Crear Factura
        </Typography>
        <TextField
          select
          label="Cliente"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        >
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.name}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Tipo de Factura"
          name="tipo_factura"
          value={formData.tipo_factura}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="credito">Crédito</MenuItem>
          <MenuItem value="contado">Contado</MenuItem>
        </TextField>
        <TextField
          select
          label="Producto"
          name="producto"
          value={formData.producto}
          onChange={handleProductChange}
          variant="outlined"
          fullWidth
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.name}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Precio"
          name="precio"
          value={formData.precio}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleQuantityChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Subtotal"
          name="subtotal"
          value={formData.subtotal}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Total"
          name="total"
          value={formData.total}
          variant="outlined"
          fullWidth
          disabled
        />
        <Button type="submit" variant="contained" color="primary">
          Crear Factura
        </Button>
      </Box>
    </Container>
  );
};
