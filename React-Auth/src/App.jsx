import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './Contexts/AuthContext';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import RequireAuth from './Components/RequireAuth';
import RetroTheme from './Styles/RetroTheme';

function App() {
  useEffect(() => {
    //  MODO DESARROLLO: Limpiar sesión al iniciar
    // Comenta o elimina estas líneas en producción
    if (import.meta.env.DEV) {
      // Solo limpia si acabas de iniciar el servidor (primera carga)
      const hasInitialized = sessionStorage.getItem('app_initialized');
      
      if (!hasInitialized) {
        console.log(' Limpiando sesión anterior...');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.setItem('app_initialized', 'true');
      }
    }
  }, []);

  return (
      <ThemeProvider theme={RetroTheme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                } 
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;