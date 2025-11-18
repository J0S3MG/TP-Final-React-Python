import { Card, CardContent, Typography, Box } from '@mui/material';

function UserInfoCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FFFFFF',
            mb: 2,
            textShadow: `
              0 0 8px rgba(0, 0, 0, 0.9),
              0 0 15px #00F5FF,
              0 2px 4px rgba(0, 0, 0, 0.8)
            `,
          }}
        >
          [ DATOS_USUARIO ]
        </Typography>
        <Box sx={{ fontFamily: 'monospace' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1,
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span style={{ 
              color: '#00F5FF',
              fontWeight: 700,
              textShadow: `
                0 0 8px rgba(0, 0, 0, 0.9),
                0 0 10px #00F5FF
              `,
            }}>
              ID:
            </span> {user.id}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1,
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span style={{ 
              color: '#00F5FF',
              fontWeight: 700,
              textShadow: `
                0 0 8px rgba(0, 0, 0, 0.9),
                0 0 10px #00F5FF
              `,
            }}>
              NAME:
            </span> {user.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1,
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span style={{ 
              color: '#00F5FF',
              fontWeight: 700,
              textShadow: `
                0 0 8px rgba(0, 0, 0, 0.9),
                0 0 10px #00F5FF
              `,
            }}>
              EMAIL:
            </span> {user.email}
          </Typography>
          <Typography 
            variant="body2"
            sx={{ 
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span style={{ 
              color: '#00F5FF',
              fontWeight: 700,
              textShadow: `
                0 0 8px rgba(0, 0, 0, 0.9),
                0 0 10px #00F5FF
              `,
            }}>
              ROLE:
            </span>{' '}
            {user.role.toUpperCase()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;