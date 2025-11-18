import { createContext, useContext, useState, useEffect, useCallback } from 'react';


// Crea el objeto Contexto. Es el 'tunel' por donde se enviaran los datos.
// Se inicializa con 'null'.
const AuthContext = createContext(null);


// EL PROVEEDOR DE CONTEXTO (AuthProvider) es el Componente principal que contiene la logica.
// Y el estado de la autenticacion.
// Recibe `children`, los componentes que envolvera.
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); // Almacena el objeto usuario logueado.
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Indica si el usuario esta autenticado (logueado).
  const [loading, setLoading] = useState(false); // Indica si una operacion (login, fetch) esta en curso.
  const [initializing, setInitializing] = useState(true); // Estado de inicializacion.
  const [error, setError] = useState(null); // Almacena mensajes de error.
  const [protectedData, setProtectedData] = useState(null); // Almacena datos sensibles obtenidos despues de la autenticacion.


  // PERSISTENCIA DE SESION (localStorage).
  // Este hook se ejecuta una sola vez al montar el componente.
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) { // Si encuentra ambos, restaura la sesion.
          setUser(JSON.parse(storedUser)); // Guarda el objeto usuario parseado en el estado `user`.
          setIsAuthenticated(true); // Confirma la autenticacion.
        }
      } catch (err) {
        console.error('Error al inicializar autenticación:', err);
        // Limpiar localStorage corrupto
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        // Pequeño delay para evitar parpadeo
        setTimeout(() => {
          setInitializing(false);
        }, 300);
      }
    };

    initializeAuth();
  }, []);

  // FUNCIÓN LOGIN
  const login = async (email, password) => {
    // Inicia la carga y resetea errores.
    setLoading(true);
    setError(null);

    try {
      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      // PUNTO DE REEMPLAZO: Reemplazar con llamada a API real
      // const response = await fetch('https://api.tu-backend.com/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // MOCK: Validación de credenciales
      if (email === 'gamer@retro.com' && password === 'neon1234') {
        const mockUser = {
          id: 1,
          email: email,
          name: 'Retro Gamer',
          role: 'admin',
        };
        const mockToken = 'mock-jwt-token-' + Date.now();

        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', mockToken);

        return { success: true };
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN REGISTER
  const registerUser = async (email, password, confirmPassword) => {
    setLoading(true);
    setError(null);

    try {
      // Validación de contraseñas
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      // PUNTO DE REEMPLAZO: Reemplazar con llamada a API real
      // const response = await fetch('https://api.tu-backend.com/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // MOCK: Crear nuevo usuario
      const mockUser = {
        id: Date.now(),
        email: email,
        name: 'Retro Gamer',
        role: 'admin',
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN LOGOUT
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setProtectedData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  // FUNCIÓN FETCH DATOS PROTEGIDOS
  const fetchProtectedData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      //  PUNTO DE REEMPLAZO: Reemplazar con llamada a API real
      // const response = await fetch('https://api.tu-backend.com/protected-data', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulación de delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // MOCK: Datos protegidos
      const mockData = {
        stats: {
          level: 42,
          score: 999999,
          achievements: 156,
        },
        recentActivity: [
          { id: 1, action: 'Login exitoso', timestamp: new Date().toISOString() },
          { id: 2, action: 'Completado nivel 41', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: 3, action: 'Nuevo logro desbloqueado', timestamp: new Date(Date.now() - 7200000).toISOString() },
        ],
      };

      setProtectedData(mockData);
      return { success: true, data: mockData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);


  // VALOR DEL CONTEXTO Objeto que agrupa todos los estados y funciones que queremos.
  // Compartir con los componentes de la aplicacion.
  const value = {
    user,
    isAuthenticated,
    loading,
    initializing, //Exponemos el estado de inicialización
    error,
    protectedData,
    login,
    registerUser,
    logout,
    fetchProtectedData,
  };


  // RENDERIZADO DEL PROVEEDOR
  // Envuelve a sus hijos, pasandoles el objeto `value` a traves del Contexto.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// CUSTOM HOOK (useAuth)
// Este hook simplifica el acceso a los datos del contexto en cualquier componente.
export const useAuth = () => { 
  const context = useContext(AuthContext); // Intenta acceder al contexto.
  if (!context) { // Si el contexto es nulo, significa que el hook no esta dentro del AuthProvider.
    throw new Error('useAuth debe usarse dentro de AuthProvider'); // Lanza un error util para el desarrollador.
  }
  return context; // Retorna el objeto de valores (estados y funciones) del contexto.
};