import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import {
  About,
  Cliente,
  Facturacion,
  Facturas,
  Home,
  Product,
  StorePage,
} from './pages';
import { ProductUpdateForm } from './components/Productos/ProductUpdateForm';
import { ClientUpdate } from './components/Clientes/ClientUpdate';
import { Register } from './components/Login/Register';
import { Login } from './components/Login/Login';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#f5f5f5',
        paper: '#fff',
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <CssBaseline />
          {isAuthenticated && <Navbar />}
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {isAuthenticated && <Sidebar />}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
              }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {isAuthenticated ? (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/productos" element={<Product />} />
                    <Route path="/clientes" element={<Cliente />} />
                    <Route path="/facturas" element={<Facturas />} />
                    <Route path="/facturacion" element={<Facturacion />} />
                    <Route path="/tienda" element={<StorePage />} />
                    <Route path="/update/:id" element={<ProductUpdateForm />} />
                    <Route
                      path="/update_client/:id"
                      element={<ClientUpdate />}
                    />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" replace />} />
                )}
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
