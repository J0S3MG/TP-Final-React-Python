import  { useState, useEffect } from 'react';
import {  useNavigate} from 'react-router-dom';
import { Box, TextField, Button, Paper, Typography, CircularProgress, Alert, Container} from '@mui/material';


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(email, password, confirmPassword);
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
        '@keyframes scan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50%)' },
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PersonAddIcon sx={{ fontSize: 60, color: '#AB00FF', mb: 2, filter: 'drop-shadow(0 0 10px #AB00FF)' }} />
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#AB00FF', textShadow: '0 0 10px #AB00FF' }}>
            // NEW_USER
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, color: '#00FFFF' }}>
            &gt; Crear nueva cuenta_
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
              label="// CONFIRM_PASSWORD"
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
              startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
            >
              {loading ? 'REGISTRANDO...' : '> CREAR_CUENTA'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                ¿Ya tienes cuenta?
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/login')}
                disabled={loading}
              >
                INICIAR_SESION
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;