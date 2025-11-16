import  {  useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box,  Button, Paper, Typography, Card, CardContent, CircularProgress,  Container, Grid } from '@mui/material';
import { Logout as LogoutIcon, } from '@mui/icons-material';

function DashboardPage() {
  const { user, logout, isAuthenticated, protectedData, fetchProtectedData, loading } = useAuth();
  const navigate = useNavigate();

  // Protección de ruta
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Cargar datos protegidos al montar el componente
      fetchProtectedData();
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        <Paper sx={{ p: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>
              // DASHBOARD_MAIN
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A2BE2', mt: 1 }}>
              &gt; Sistema_Operativo: Online_
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderWidth: 2 }}
          >
            LOGOUT
          </Button>
        </Paper>

        <Grid container spacing={3}>
          {/* User Info Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00FFFF', mb: 2 }}>
                  [ DATOS_USUARIO ]
                </Typography>
                <Box sx={{ fontFamily: 'monospace' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <span style={{ color: '#8A2BE2' }}>ID:</span> {user.id}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <span style={{ color: '#8A2BE2' }}>NAME:</span> {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <span style={{ color: '#8A2BE2' }}>EMAIL:</span> {user.email}
                  </Typography>
                  <Typography variant="body2">
                    <span style={{ color: '#8A2BE2' }}>ROLE:</span> {user.role.toUpperCase()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00FFFF', mb: 2 }}>
                  [ ESTADÍSTICAS ]
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                    <CircularProgress sx={{ color: '#00FFFF' }} />
                  </Box>
                ) : protectedData?.stats ? (
                  <Box sx={{ fontFamily: 'monospace' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <span style={{ color: '#8A2BE2' }}>LEVEL:</span> {protectedData.stats.level}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <span style={{ color: '#8A2BE2' }}>SCORE:</span> {protectedData.stats.score.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <span style={{ color: '#8A2BE2' }}>ACHIEVEMENTS:</span> {protectedData.stats.achievements}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    No hay datos disponibles
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Activity Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00FFFF', mb: 2 }}>
                  [ ACTIVIDAD_RECIENTE ]
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                    <CircularProgress sx={{ color: '#00FFFF' }} />
                  </Box>
                ) : protectedData?.recentActivity ? (
                  <Box>
                    {protectedData.recentActivity.map((activity) => (
                      <Box
                        key={activity.id}
                        sx={{
                          p: 2,
                          mb: 1,
                          border: '1px solid #8A2BE2',
                          borderRadius: 1,
                          background: 'rgba(138, 43, 226, 0.05)',
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#00FFFF' }}>
                          &gt; {activity.action}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {new Date(activity.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    No hay actividad reciente
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;