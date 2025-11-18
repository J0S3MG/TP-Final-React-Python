import { createTheme } from '@mui/material/styles';

const RetroTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF006E', // Rosa neón intenso (Cyberpunk)
      light: '#FF1F8F',
      dark: '#C70058',
    },
    secondary: {
      main: '#00F5FF', // Cyan eléctrico (Matrix/Blade Runner)
      light: '#5FFBFF',
      dark: '#00BCD4',
    },
    background: {
      default: '#0a0015', // Negro profundo con tinte violeta
      paper: '#0d0221', // Oscuro con matiz púrpura
    },
    text: {
      primary: '#E0F7FF', // Cyan muy claro (terminales)
      secondary: '#FF006E', // Rosa neón
    },
    error: {
      main: '#FF0055', // Rosa error neón
    },
    success: {
      main: '#00FF9F', // Verde Matrix
    },
    warning: {
      main: '#FFB800', // Amarillo/naranja
    },
    info: {
      main: '#00F5FF', // Cyan
    },
  },
  
  typography: {
    fontFamily: '"Press Start 2P", "Courier New", "Roboto Mono", monospace',
    
    h3: {
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      textShadow: `
        0 0 10px rgba(0, 0, 0, 0.8),
        0 0 20px #FF006E,
        0 0 30px #FF006E,
        0 2px 4px rgba(0, 0, 0, 0.9)
      `,
      color: '#FFFFFF',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      textShadow: `
        0 0 10px rgba(0, 0, 0, 0.8),
        0 0 15px #00F5FF,
        0 0 25px #00F5FF,
        0 2px 4px rgba(0, 0, 0, 0.9)
      `,
      color: '#FFFFFF',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      textShadow: `
        0 0 8px rgba(0, 0, 0, 0.9),
        0 0 15px #FF006E,
        0 2px 3px rgba(0, 0, 0, 0.8)
      `,
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.08em',
      textShadow: `
        0 0 8px rgba(0, 0, 0, 0.9),
        0 0 12px #00F5FF,
        0 2px 3px rgba(0, 0, 0, 0.8)
      `,
      color: '#FFFFFF',
    },
    body1: {
      letterSpacing: '0.02em',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
    },
    body2: {
      letterSpacing: '0.02em',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
    },
    button: {
      letterSpacing: '0.15em',
      fontWeight: 700,
      textTransform: 'uppercase',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
    },
  },
  
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(ellipse at top, #1a0033 0%, #0a0015 50%, #000000 100%)',
          backgroundAttachment: 'fixed',
          position: 'relative',
          // Rejilla de fondo estilo retrowave
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 0, 110, 0.05) 25%, rgba(255, 0, 110, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 110, 0.05) 75%, rgba(255, 0, 110, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 245, 255, 0.05) 25%, rgba(0, 245, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 245, 255, 0.05) 75%, rgba(0, 245, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
            zIndex: 0,
          },
          // Escaneo horizontal estilo CRT
          '&::after': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 110, 0.03) 2px, rgba(255, 0, 110, 0.03) 4px)',
            pointerEvents: 'none',
            animation: 'scanlines 8s linear infinite',
            zIndex: 1,
          },
          '@keyframes scanlines': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(50%)' },
          },
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #0d0221 0%, #1a0033 50%, #0d0221 100%)',
          border: '2px solid transparent',
          borderImage: 'linear-gradient(135deg, #FF006E, #00F5FF) 1',
          boxShadow: `
            0 0 20px rgba(255, 0, 110, 0.4),
            0 0 40px rgba(0, 245, 255, 0.2),
            inset 0 0 30px rgba(255, 0, 110, 0.05),
            inset 0 0 60px rgba(0, 245, 255, 0.02)
          `,
          borderRadius: '4px',
          position: 'relative',
          transition: 'all 0.3s ease',
          
          // Efecto de esquinas estilo Cyberpunk
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: 'linear-gradient(45deg, #FF006E 0%, #00F5FF 50%, #FF006E 100%)',
            borderRadius: '4px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: -1,
          },
          
          '&:hover::before': {
            opacity: 0.3,
            animation: 'borderPulse 2s ease-in-out infinite',
          },
          
          '@keyframes borderPulse': {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
          },
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 2, 33, 0.85)',
          border: '1px solid #00F5FF',
          boxShadow: `
            0 0 15px rgba(0, 245, 255, 0.5),
            0 0 30px rgba(255, 0, 110, 0.2),
            inset 0 0 20px rgba(0, 245, 255, 0.05)
          `,
          borderRadius: '4px',
          position: 'relative',
          transition: 'all 0.3s ease',
          
          // Detalles decorativos en las esquinas
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderTop: '3px solid #00F5FF',
            borderLeft: '3px solid #00F5FF',
            opacity: 0.7,
          },
          
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `
              0 0 25px rgba(0, 245, 255, 0.7),
              0 0 50px rgba(255, 0, 110, 0.3),
              inset 0 0 30px rgba(0, 245, 255, 0.08)
            `,
          },
        },
      },
    },
    
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          border: '2px solid',
          fontWeight: 700,
          letterSpacing: '0.15em',
          padding: '12px 32px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          
          // Efecto de escaneo al hacer hover
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            transition: 'left 0.5s ease',
          },
          
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF006E 0%, #C70058 100%)',
          borderColor: '#FF006E',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
          
          '&:hover': {
            background: 'linear-gradient(135deg, #FF1F8F 0%, #FF006E 100%)',
            boxShadow: `
              0 0 30px rgba(255, 0, 110, 0.8),
              0 0 60px rgba(255, 0, 110, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
            transform: 'translateY(-2px) scale(1.02)',
          },
          
          '&:disabled': {
            background: 'rgba(255, 0, 110, 0.2)',
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        outlined: {
          borderColor: '#00F5FF',
          color: '#00F5FF',
          
          '&:hover': {
            borderColor: '#00F5FF',
            backgroundColor: 'rgba(0, 245, 255, 0.1)',
            boxShadow: `
              0 0 20px rgba(0, 245, 255, 0.5),
              inset 0 0 20px rgba(0, 245, 255, 0.1)
            `,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(10, 0, 21, 0.5)',
            
            '& fieldset': {
              borderColor: '#FF006E',
              borderWidth: '2px',
              transition: 'all 0.3s ease',
            },
            
            '&:hover fieldset': {
              borderColor: '#FF1F8F',
              boxShadow: '0 0 15px rgba(255, 0, 110, 0.4)',
            },
            
            '&.Mui-focused fieldset': {
              borderColor: '#00F5FF',
              borderWidth: '2px',
              boxShadow: `
                0 0 20px rgba(0, 245, 255, 0.6),
                inset 0 0 10px rgba(0, 245, 255, 0.1)
              `,
            },
            
            '& input': {
              color: '#E0F7FF',
              textShadow: '0 0 5px rgba(0, 245, 255, 0.3)',
            },
          },
          
          '& .MuiInputLabel-root': {
            color: '#FF006E',
            fontWeight: 600,
            letterSpacing: '0.1em',
            
            '&.Mui-focused': {
              color: '#00F5FF',
              textShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
            },
          },
        },
      },
    },
    
    MuiAlert: {
      styleOverrides: {
        root: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '4px',
          fontWeight: 600,
        },
        standardError: {
          backgroundColor: 'rgba(255, 0, 85, 0.1)',
          borderColor: '#FF0055',
          color: '#FF5588',
          boxShadow: '0 0 15px rgba(255, 0, 85, 0.2)',
          
          '& .MuiAlert-icon': {
            color: '#FF0055',
          },
        },
        standardSuccess: {
          backgroundColor: 'rgba(0, 255, 159, 0.1)',
          borderColor: '#00FF9F',
          color: '#00FFCC',
          boxShadow: '0 0 15px rgba(0, 255, 159, 0.2)',
          
          '& .MuiAlert-icon': {
            color: '#00FF9F',
          },
        },
      },
    },
    
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#00F5FF',
          filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.8))',
        },
      },
    },
    
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 0, 110, 0.2)',
          height: '6px',
          borderRadius: '3px',
        },
        bar: {
          background: 'linear-gradient(90deg, #FF006E, #00F5FF)',
          boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
        },
      },
    },
    
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#00F5FF',
          textDecoration: 'none',
          position: 'relative',
          transition: 'all 0.3s ease',
          
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: '0%',
            height: '2px',
            background: 'linear-gradient(90deg, #FF006E, #00F5FF)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
          },
          
          '&:hover': {
            color: '#FF006E',
            textShadow: '0 0 10px rgba(255, 0, 110, 0.8)',
            
            '&::after': {
              width: '100%',
            },
          },
        },
      },
    },
    
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h4': {
            background: 'linear-gradient(135deg, #FF006E, #00F5FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
        },
      },
    },
  },
});

export default RetroTheme;