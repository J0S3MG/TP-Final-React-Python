import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography, Container } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import UserInfoCard from '../Components/UserInfoCard';
import StatsCard from '../Components/StatsCard';
import ActivityList from '../Components/ActivityList';
import RetroGame from '../Components/RetroGame';

function DashboardPage() {
  const { user, logout, protectedData, fetchProtectedData, loading } = useAuth();
  const navigate = useNavigate();
  const [gameActivities, setGameActivities] = useState([]);

  useEffect(() => {
    fetchProtectedData();
  }, [fetchProtectedData]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Callback para actualizar actividad cuando termina el juego
  const handleGameScore = (score) => {
    const newActivity = {
      id: Date.now(),
      action: `Juego completado - Score: ${score}`,
      timestamp: new Date().toISOString(),
    };
    
    setGameActivities(prev => [newActivity, ...prev].slice(0, 5)); // Mantener últimas 5
  };

  // Combinar actividades del juego con las del servidor
  const allActivities = [
    ...gameActivities,
    ...(protectedData?.recentActivity || [])
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF', textAlign: 'center' }}
            >
              BIENVENIDO OPERADOR
            </Typography>
            <Typography variant="body1" sx={{ color: '#8A2BE2', mt: 1 }}>
              &gt; Red Segura: Ingreso en la Matrix exitoso  
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderWidth: 2 }}
          >
            SALIR
          </Button>
        </Paper>

        {/* Cards Container */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          {/* User Info Card */}
          <UserInfoCard user={user} />

          {/* Stats Card */}
          <StatsCard loading={loading} stats={protectedData?.stats} />

          {/* Mini-juego */}
          <RetroGame onScoreUpdate={handleGameScore} />

          {/* Activity List */}
          <ActivityList loading={loading} activities={allActivities} />
        </Box>
      </Container>
    </Box>
  );
}

export default DashboardPage;

