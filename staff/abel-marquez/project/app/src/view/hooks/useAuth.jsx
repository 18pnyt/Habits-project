import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isUserLoggedIn } from '../../logic/users';

export const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Verificar estado de autenticación al cargar la aplicación
        const checkAuth = () => {
            // Solo verificar autenticación si no estamos en rutas públicas
            const publicRoutes = ['/login', '/register'];
            const isPublicRoute = publicRoutes.includes(location.pathname);

            if (!isUserLoggedIn() && !isPublicRoute) {
                // Limpiar cualquier dato restante y redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                navigate('/login');
            }
        };

        // Verificar autenticación al montar
        checkAuth();

        // Verificar autenticación cuando la ventana gana foco (usuario regresa a la pestaña)
        const handleFocus = () => {
            checkAuth();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [navigate, location.pathname]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return { logout };
};