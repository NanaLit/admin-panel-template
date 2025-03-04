import React, { useState } from 'react';
import Cookies from 'js-cookie';

import {loginApi} from '../../utils/api.ts';

interface LoginFormProps {
    onLoginError: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginApi(email, password);
            console.log(response)
            if(response.status == 401)  {
                console.log(response.data.message)
                onLoginError(response?.data.message || 'Ошибка при входе');
            } else  {
                if (response.token) {
                    // Обработка успешного входа
                    sessionStorage.setItem('isAuthenticated', 'true');
                    Cookies.set('token',  `${response.token}`, {expires: 1 / 1440, path: '/' });
                    Cookies.set('refresh_token',  `${response.refresh_token}`, { expires: 1 / 10440, path: '/' });
                    // Перенаправление на защищенную страницу
                    window.location.href = '/';
                } else {
                    setError(response.message)
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Неизвестная ошибка');
            }
            console.error('Ошибка при входе:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
