import React from 'react';
import { useTheme } from '../../context/ThemeContext';

import './Dashboard.scss'; 



const Dashboard: React.FC = () => {

    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Панель управления</h2>
            <p>Current theme: {theme}</p>
            <button onClick={handleThemeChange}>Switch Theme</button>
        </div>
    );
};

export default Dashboard;