import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

function StatsCard({ loading, stats }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#00FFFF', mb: 2 }}>
           ESTADÍSTICAS 
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress sx={{ color: '#00FFFF' }} />
          </Box>
        ) : stats ? (
          <Box sx={{ fontFamily: 'monospace' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <span style={{ color: '#8A2BE2' }}>SCORE:</span>{' '}
              {stats.score.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <span style={{ color: '#8A2BE2' }}>Citys:</span>{' '}
              {stats.achievements}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#666' }}>
            No hay datos disponibles
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCard;