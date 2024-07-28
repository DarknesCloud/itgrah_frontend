import {
  Container,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import CardComponent from '../components/Home/CardComponent';
import CardComponent2 from '../components/Home/CardComponent2';
import FacturaDonutChart from '../components/Home/FacturaDonutChart';

export const Home = () => {
  const theme = createTheme();

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            height: '30vh',
          }}
        >
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid item xs={12} md={4}>
              <CardComponent
                apiUrl="http://localhost:8000/api/clientes/"
                name="Clientes"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardComponent
                apiUrl="http://localhost:8000/api/productos/"
                name="Productos"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardComponent2
                apiUrl="http://localhost:8000/api/facturas/"
                name="Ventas"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <ThemeProvider theme={theme}>
        <FacturaDonutChart />
      </ThemeProvider>
    </>
  );
};
