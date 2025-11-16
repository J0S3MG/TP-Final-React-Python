import { createContext, useContext, useState, useEffect } from 'react';

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
    
    const [error, setError] = useState(null); // Almacena mensajes de error.
    
    const [protectedData, setProtectedData] = useState(null); // Almacena datos sensibles obtenidos despues de la autenticacion.


    // PERSISTENCIA DE SESION (localStorage).
    // Este hook se ejecuta una sola vez al montar el componente.
    useEffect(() => {
        // Intenta recuperar el usuario y el token del almacenamiento local del navegador.
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        // Si encuentra ambos, restaura la sesion:
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser)); // Guarda el objeto usuario parseado en el estado `user`.
            setIsAuthenticated(true); // Confirma la autenticacion.
        }
    }, []); 


    // FUNCION LOGIN
    const login = async (email, password) => {
        // Inicia la carga y resetea errores.
        setLoading(true);
        setError(null);

        try {
            // SIMULACION DE DELAY DE RED (Espera 1.5 segundos para imitar una llamada de red).
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (email === 'gamer@retro.com' && password === 'neon1234') { // MOCK: Logica de credenciales de prueba.
                
                const mockUser = { // Datos del usuario simulado (Mock User).
                    id: 1,
                    email: email,
                    name: 'Retro Gamer',
                    role: 'admin',
                };
                const mockToken = 'mock-jwt-token-' + Date.now(); // Token simulado.

                // Guardar en estado.
                setUser(mockUser);
                setIsAuthenticated(true);
                // Guardar en localStorage para persistencia.
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockToken);
                return { success: true }; // Retorna exito.
            } else {
                // Lanza un error si las credenciales no coinciden con el mock.
                throw new Error('Credenciales invalidas');
            }
        } catch (err) {
            // Captura cualquier error (simulado o real de la API).
            setError(err.message);
            return { success: false, error: err.message }; 
        } finally {
            // Se ejecuta siempre al final, detiene la carga.
            setLoading(false);
        }
    };


    // FUNCION LOGOUT
    const logout = () => {
        // Resetea todos los estados de la sesion.
        setUser(null);
        setIsAuthenticated(false);
        setProtectedData(null);
        // Elimina el usuario y el token del almacenamiento local.
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };


    // FUNCION FETCH DATOS PROTEGIDOS
    const fetchProtectedData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Recupera el token para usarlo en la cabecera de la API (Autorizacion).
            const token = localStorage.getItem('token');

            // SIMULACION DE DELAY DE RED (Espera 1 segundo).
            await new Promise(resolve => setTimeout(resolve, 1000));

            // MOCK: Datos protegidos de ejemplo.
            const mockData = {
                stats: {
                level: 42,
                score: 999999,
                achievements: 156,
                },
                recentActivity: [
                    { id: 1, action: 'Login exitoso', timestamp: new Date().toISOString() },
                ],
            };

            // Guarda los datos simulados en el estado.
            setProtectedData(mockData);
            return { success: true, data: mockData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // VALOR DEL CONTEXTO Objeto que agrupa todos los estados y funciones que queremos.
    // Compartir con los componentes de la aplicacion.
    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        protectedData,
        login,
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
    // Intenta acceder al contexto.
    const context = useContext(AuthContext);

    // Si el contexto es nulo, significa que el hook no esta dentro del AuthProvider.
    if (!context) {
        // Lanza un error util para el desarrollador.
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    // Retorna el objeto de valores (estados y funciones) del contexto.
    return context;
};