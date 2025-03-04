import React, {useContext} from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

import Cookies from 'js-cookie';

import './Dashboard.scss'; 



const Dashboard: React.FC = () => {

    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        Cookies.remove('token');
        Cookies.remove('refresh_token');
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Панель управления</h2>
            <p>Current theme: {theme}</p>
            <button onClick={handleThemeChange}>Switch Theme</button>
            <button onClick={handleLogout}>log out</button>
        </div>
    );
};

export default Dashboard;