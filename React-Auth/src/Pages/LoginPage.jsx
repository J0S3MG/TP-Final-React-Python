import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Alert, Typography } from '@mui/material';
import { Login as LoginIcon, Security as SecurityIcon } from '@mui/icons-material';
import AuthFormLayout from '../Components/AuthFormLayout';
import AuthHeader from '../Components/AuthHeader';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthFormLayout>
      <AuthHeader
        icon={SecurityIcon}
        title="INICIO DE SESIÓN"
        subtitle={{ text: 'Prueba de Autenticación', color: '#8A2BE2' }}
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
        >
          {loading ? 'CONECTANDO...' : ' INICIAR SESION'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body1" sx={{ color: '#d806ebff', mb: 1,fontSize: '1.2rem' }}>
            ¿No tienes cuenta?
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
            fullWidth
            disabled={loading}
          >
            REGISTRAR CUENTA
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#fff8f8ff',
            mt: 3,
            fontSize: '1rem',
          }}
        >
          🎮 CREDENCIALES DE PRUEBA:
          <br />
          Email: gamer@retro.com
          <br />
          Password: Neo123
        </Typography>
      </Box>
    </AuthFormLayout>
  );
}

export default LoginPage;