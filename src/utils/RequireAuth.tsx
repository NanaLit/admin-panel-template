import { JSX, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext }  from '../context/AuthContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) {
        // Перенаправление на страницу логина, если пользователь не авторизован
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Если пользователь авторизован, отображаем защищенный маршрут
    return children;
};

export default RequireAuth;
