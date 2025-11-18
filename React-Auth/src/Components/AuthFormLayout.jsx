import { Box, Paper, Container } from '@mui/material';

function AuthFormLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          radial-gradient(ellipse at top, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
          linear-gradient(180deg, #0a0015 0%, #1a0033 50%, #0a0015 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        
        // Sol/Luna estilo retrowave en el fondo
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle, 
              #FF006E 0%, 
              #FF1F8F 30%, 
              #C70058 70%, 
              transparent 100%
            )
          `,
          boxShadow: `
            0 0 60px rgba(255, 0, 110, 0.4),
            0 0 120px rgba(255, 0, 110, 0.2),
            inset 0 0 60px rgba(255, 0, 110, 0.3)
          `,
          opacity: 0.6,
          zIndex: 0,
        },
        
        // Rejilla perspectiva estilo suelo retrowave
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 245, 255, 0.15) 25%, rgba(0, 245, 255, 0.15) 26%, transparent 27%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 0, 110, 0.15) 25%, rgba(255, 0, 110, 0.15) 26%, transparent 27%, transparent)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          opacity: 0.8,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(13, 2, 33, 0.85)',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}

export default AuthFormLayout;