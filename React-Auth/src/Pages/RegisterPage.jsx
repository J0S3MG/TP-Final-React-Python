import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import AuthHeader from '../Components/AuthHeader';
import AuthFormLayout from '../Components/AuthFormLayout';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser, loading, error, isAuthenticated } = useAuth(); // CAMBIADO: register -> registerUser
  const navigate = useNavigate();

  // Redirección si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(email, password, confirmPassword); // CAMBIADO: register -> registerUser
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthFormLayout>
          <AuthHeader
                  icon={AppRegistrationIcon}
                  title="Registrar Cuenta"
                  subtitle={{ text: 'Nueva Cuenta', color: '#8A2BE2' }}
                  iconColor="#00FFFF"
                />

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              ERROR: {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="EMAIL"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="CONTRASEÑA"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="CONFIRAMR CONTRASEÑA"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} /> : <PersonAddIcon />
              }
            >
              {loading ? 'REGISTRANDO...' : ' CREAR CUENTA'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body1" sx={{ color: '#dbdadaff', mb: 1 }}>
                ¿Ya tienes cuenta?
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="secondary"
                fullWidth
                disabled={loading}
              >
                INICIAR SESION
              </Button>
            </Box>
          </Box>
    </AuthFormLayout>
  );
}

export default RegisterPage;