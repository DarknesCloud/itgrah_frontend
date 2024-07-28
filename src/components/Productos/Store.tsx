// src/components/ShoppingCard/ProductCard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Box,
} from '@mui/material';

interface Product {
  id: number;
  name: string;
  stock: string;
  precio: string;
  total: string;
}

export const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/productos')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/150"
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Precio: {product.precio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total: {product.total}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Rating name="read-only" value={4} readOnly />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: 1 }}
                >
                  4.0
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
