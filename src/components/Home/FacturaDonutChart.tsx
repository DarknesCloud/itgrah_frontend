import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, CircularProgress, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Factura {
  tipo_factura: string;
}

const FacturaDonutChart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [creditoCount, setCreditoCount] = useState(0);
  const [contadoCount, setContadoCount] = useState(0);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/facturas/');
        const facturas: Factura[] = response.data;

        const credito = facturas.filter(
          (factura) => factura.tipo_factura === 'credito'
        ).length;
        const contado = facturas.filter(
          (factura) => factura.tipo_factura === 'contado'
        ).length;

        setCreditoCount(credito);
        setContadoCount(contado);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facturas:', error);
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

  const data = {
    labels: ['Credito', 'Contado'],
    datasets: [
      {
        data: [creditoCount, contadoCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const total = creditoCount + contadoCount;
  const creditoPercentage = ((creditoCount / total) * 100).toFixed(2);
  const contadoPercentage = ((contadoCount / total) * 100).toFixed(2);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" gutterBottom>
        Porcentaje de Facturas por Tipo
      </Typography>
      <Box width={300} height={300}>
        <Doughnut data={data} options={{ maintainAspectRatio: false }} />
      </Box>
      <Box mt={2}>
        <Typography variant="body1">Credito: {creditoPercentage}%</Typography>
        <Typography variant="body1">Contado: {contadoPercentage}%</Typography>
      </Box>
    </Box>
  );
};

export default FacturaDonutChart;
