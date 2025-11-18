import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

function ActivityList({ loading, activities }) {
  return (
    <Card sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FFFFFF !important',
            mb: 2,
            textShadow: `
              0 0 8px rgba(0, 0, 0, 0.9),
              0 0 15px #00F5FF,
              0 2px 4px rgba(0, 0, 0, 0.9)
            `,
            fontWeight: 700,
          }}
        >
          [ ACTIVIDAD_RECIENTE ]
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress sx={{ color: '#00F5FF' }} />
          </Box>
        ) : activities && activities.length > 0 ? (
          <Box>
            {activities.map((activity) => (
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
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#FFFFFF !important',
                    textShadow: `
                      0 0 5px rgba(0, 0, 0, 0.9),
                      0 1px 2px rgba(0, 0, 0, 0.8)
                    `,
                    fontWeight: 600,
                  }}
                >
                  &gt; {activity.action}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#AAAAAA !important',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {new Date(activity.timestamp).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#AAAAAA !important',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            No hay actividad reciente
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ActivityList;