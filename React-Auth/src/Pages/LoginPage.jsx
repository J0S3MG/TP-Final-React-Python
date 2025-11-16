import  { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {  Box, TextField, Button, Paper, Typography,CircularProgress, Alert, Container } from '@mui/material';
import { Login as LoginIcon,  Security as SecurityIcon } from '@mui/icons-material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redireccion si ya esta autenticado
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #8A2BE2 2px, #8A2BE2 4px)',
          opacity: 0.03,
          animation: 'scan 8s linear infinite',
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SecurityIcon sx={{ fontSize: 60, color: '#00FFFF', mb: 2, filter: 'drop-shadow(0 0 10px #00FFFF)' }} />
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>
            // RETRO_AUTH
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, color: '#8A2BE2' }}>
            &gt; Inicializar sesión_
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2, border: '1px solid #FF00FF' }}>
              ERROR: {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="// EMAIL_ADDRESS"
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
              label="// PASSWORD_KEY"
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
              {loading ? 'CONECTANDO...' : '> INICIAR_SESION'}
            </Button>

            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#666', mt: 2 }}>
              🎮 CREDENCIALES DE PRUEBA:<br />
              Email: gamer@retro.com<br />
              Password: neon1234
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;