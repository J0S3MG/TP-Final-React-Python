import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#00FFFF' }} size={60} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;