// src/components/Facturas/FacturaList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const API_URL = 'http://localhost:8000/api/facturas';

interface Factura {
  id: number;
  cliente: string;
  tipo_factura: string;
  producto: string;
  cantidad: string;
  precio: string;
  subtotal: string;
  total: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)', // Ajuste de boxShadow
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const ListaFactura: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get(API_URL);
        setFacturas(response.data);
      } catch (err) {
        setError('Error al obtener las facturas');
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Listado de Facturas
      </Typography>
      <Grid container spacing={3}>
        {facturas.map((factura) => (
          <Grid item xs={12} sm={6} md={4} key={factura.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Cliente: {factura.cliente}
                </Typography>
                <Typography color="textSecondary">
                  Tipo de Factura: {factura.tipo_factura}
                </Typography>
                <Typography color="textSecondary">
                  Producto: {factura.producto}
                </Typography>
                <Typography color="textSecondary">
                  Precio: ${factura.precio}
                </Typography>
                <Typography color="textSecondary">
                  Cantidad: {factura.cantidad}
                </Typography>
                <Typography color="textSecondary">
                  Subtotal: ${factura.subtotal}
                </Typography>
                <Typography color="textSecondary">
                  Total: ${factura.total}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
