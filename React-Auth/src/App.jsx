import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './Contexts/AuthContext';
import { CssBaseline  } from '@mui/material';
import RequireAuth from './Components/RequireAuth';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import DashboardPage  from './Pages/DashboardPage';
import RetroTheme from './Styles/RetroTheme';

function App() {
  return (
    <ThemeProvider theme={RetroTheme}> {/* Envolvemos la app en el tema*/}
      <CssBaseline />
      <AuthProvider> {/*Envolvemos la app en el proveedor de contexto*/}
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
