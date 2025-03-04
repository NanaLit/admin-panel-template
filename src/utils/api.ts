import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL
})

$api.interceptors.request.use(config => {
    const token = Cookies.get('token');
    
    if (token) {
        config.headers.Authorization = `${token}`; 
    }

    return config;
});

$api.interceptors.response.use(
    (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                return {message: 'Не авторизован'}
            }
            return Promise.reject(error);
        }
);

const loginApi = async (email: string, password:string): Promise<any> => {
    if (!email || !password) {
        throw new Error('Имя и пароль обязательны');
    }

    try {
        const response = await axios.post(`${SERVER_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при входе:', error.message);
            return error.response;
        } else {
            return {
                status: error.request ? error.request.status : 500,
                data: { message: error.message || 'Network error' } 
            };
        }
    }
}

const refresh = async () => {
    try {
        const refreshToken = Cookies.get('refresh_token');
        console.log(refreshToken)
        if (!refreshToken) {
            return;
        }

        const response = await axios.post(`${SERVER_URL}/auth/refresh`, { refresh_token: refreshToken });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        return { message: 'Неизвестная ошибка', error };
    }
};


export { 
    loginApi,
    refresh
};
