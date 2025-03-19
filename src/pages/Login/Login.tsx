/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Cookies from 'js-cookie';

import {loginApi} from '../../utils/api.ts';

import Form from '../../components/Form/Form';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button.tsx';
import AlertModal from '../../components/AlertModal/AlertModal';


const Login: React.FC = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const validateValues = (inputName: string, inputValue: string) => {
        const newErrors: { email: string; password: string } = { email: '', password: '' };
    
        switch (inputName) {
            case 'email':
                const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegExp.test(inputValue)) {
                    newErrors.email = "Email некорректный";
                }
                break;
            case 'password':
                if (inputValue.length < 6) {
                    newErrors.password = "Пароль очень короткий";
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
    
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
    
        // Обновляем formData
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    
        // Валидируем измененное поле
        const newErrors = validateValues(name, value);
    
        // Обновляем ошибки только для измененного поля
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: newErrors[name as keyof typeof newErrors]
        }));
    };
    const checkForm = () => {
        // Проверяем, заполнены ли все поля
        if (!formData.email || !formData.password) {
            return true; // Форма не валидна, если одно из полей пустое
        }
    
        // Проверяем, есть ли ошибки
        for (let key in errors) {
            if (errors[key as keyof typeof errors] !== '') {
                return true; // Форма не валидна, если есть ошибки
            }
        }
    
        return false; // Форма валидна
    };

    const handleShowAlert = (message: string) => {
        setShowAlert(true);
        setErrorMessage(message);
    };

    const handleHideAlert = () => {
        console.log('Alert confirmed');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkForm()) {
            handleShowAlert('Пожалуйста, исправьте ошибки в форме');
            return;
        }
        try {
            const response = await loginApi(formData.email, formData.password);
            if(response.status == 401)  {
                console.log(response.data.message)
                handleShowAlert(response?.data.message || 'Ошибка при входе');
            } else  {
                if (response.token) {
                    // Обработка успешного входа
                    sessionStorage.setItem('isAuthenticated', 'true');
                    Cookies.set('token',  `${response.token}`, {expires: 1 / 1440, path: '/' });
                    Cookies.set('refresh_token',  `${response.refresh_token}`, { expires: 1 / 10440, path: '/' });
                    // Перенаправление на защищенную страницу
                    window.location.href = '/';
                } else {
                    handleShowAlert(response.message)
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                handleShowAlert(error.message);
            } else {
                handleShowAlert('Неизвестная ошибка');
            }
            console.error('Ошибка при входе:', error);
        }
    };

    return (
        <div className='container'>
            <div className="wrapper">
                {/* <LoginForm onLoginError={handleShowAlert} /> */}
                <Form
                    handleSubmit={handleSubmit}
                > 
                    <div className="logo">
                        {/* Ваша SVG-иконка */}
                    </div>
                    <TextInput 
                        label='username'
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Логин"
                        error={errors.email}
                        />
                    <TextInput 
                        secret={true}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                        error={errors.password}
                        />
                    <Button 
                        name="Войти"
                        type="submit"
                        checkForm={checkForm}
                        />
                </Form>
                <AlertModal 
                    showAlert={showAlert} 
                    message={errorMessage}
                    setShowAlert={setShowAlert}
                    alertConfirm={() => handleHideAlert}
                    />
            </div>
        </div>
    );
};

export default Login;