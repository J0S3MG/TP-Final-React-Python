
// ============================================================
// ARCHIVO: src/Components/RequireAuth.jsx - VERSIÓN MEJORADA
// ============================================================
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../Contexts/AuthContext';

function RequireAuth({ children }) {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  // Mostrar pantalla de carga mientras se inicializa la autenticación
  if (initializing) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 100%)',
          gap: 3,
        }}
      >
        <CircularProgress 
          sx={{ 
            color: '#00FFFF',
            filter: 'drop-shadow(0 0 10px #00FFFF)',
          }} 
          size={60} 
        />
        <Typography
          variant="h6"
          sx={{
            color: '#00FFFF',
            textShadow: '0 0 10px #00FFFF',
            fontFamily: '"Courier New", Monaco, monospace',
            letterSpacing: '0.1em',
          }}
        >
          Verificando Sesion
        </Typography>
      </Box>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el contenido
  return children;
}

export default RequireAuth;