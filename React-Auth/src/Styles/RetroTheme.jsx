import { createTheme } from '@mui/material';

const RetroTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A2BE2', // Violeta Neón
      light: '#AB00FF',
      dark: '#6A0DAD',
    },
    secondary: {
      main: '#00FFFF', // Cian Eléctrico
      light: '#7FFFD4',
      dark: '#00CED1',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#00FFFF',
    },
    error: {
      main: '#FF00FF',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Monaco", "Consolas", monospace',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.08em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1a1a',
          border: '2px solid #8A2BE2',
          boxShadow: '0 0 20px rgba(138, 43, 226, 0.5), inset 0 0 20px rgba(138, 43, 226, 0.1)',
          borderRadius: '4px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111111',
          border: '1px solid #00FFFF',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
          borderRadius: '4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          border: '2px solid',
          fontWeight: 600,
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 20px currentColor',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #8A2BE2 30%, #AB00FF 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #AB00FF 30%, #8A2BE2 90%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8A2BE2',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#AB00FF',
              boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00FFFF',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
            },
          },
        },
      },
    },
  },
});

export default RetroTheme;
