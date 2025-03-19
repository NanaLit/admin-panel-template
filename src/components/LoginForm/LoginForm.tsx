import React, { useState } from 'react';
import Cookies from 'js-cookie';
import TextInput from '../TextInput/TextInput.tsx';

import {loginApi} from '../../utils/api.ts';

import './LoginForm.scss';

interface LoginFormProps {
    onLoginError: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginError }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [errors, setErrors] = useState<any>({});
    const [error, setError] = useState<string | null>(null);

    const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			email: '',
			password: ''
		};

		switch(inputName) {
            case 'email':
                const emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\-+[a-z.]+\.[a-z]{2,6}$/i;
                if (!emailRegExp.test(inputValue)) {
                error.email = "Email некорректный"
                } else {
                error.email = "";
                }
                break;
            case 'password':
                if (inputValue.length < 6) {
                error.password = "Пароль очень короткий";
                } else {
                error.password = "";
                }
                break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((state:any) => ({...state, [name]: value}))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }
  

    const checkForm = () => {
		if (formData.password && formData.email) {
		for (let key in errors) {
			if (errors[key] !== '') {
			    return true
			}
		}
		return false
		}
		return true
	}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginApi(formData.email, formData.password);
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
        <form onSubmit={handleSubmit} className='login'>
            <div className="logo">
                <svg width="140" viewBox="0 0 698 158" fill="none"><path d="M264.507 58.4621L265.081 48.6926H281.89V119.521H265.369L264.507 109.177C260.484 117.51 249.421 121.532 241.52 121.676C220.544 121.82 205.028 108.89 205.028 84.035C205.028 59.6114 221.262 46.8249 241.951 46.9686C251.433 46.9686 260.484 51.4223 264.507 58.4621ZM243.531 62.6284C231.894 62.6284 222.555 70.5302 222.555 84.035C222.555 97.5399 231.894 105.585 243.531 105.585C271.115 105.585 271.115 62.6284 243.531 62.6284Z" fill="#292929"></path><path d="M328.199 63.3468C316.993 63.3468 308.085 71.2485 308.085 84.035C308.085 96.3905 316.993 104.867 328.199 104.867C339.261 104.867 348.743 96.8215 348.743 84.035C348.743 71.6796 339.261 63.3468 328.199 63.3468ZM349.893 19.0969H367.42V119.521H351.042L349.893 109.752C344.433 118.228 335.67 121.101 327.049 121.101C306.218 121.101 290.558 107.309 290.558 84.035C290.558 59.6114 305.93 46.9686 326.618 46.9686C334.089 46.9686 345.726 50.9913 349.893 58.3184V19.0969Z" fill="#292929"></path><path d="M444.45 119.521H426.923V81.5927C426.923 72.2542 422.038 63.7778 412.412 63.7778C402.93 63.7778 397.327 72.2542 397.327 81.5927V119.521H379.799V48.5489H396.034L397.327 57.169C401.062 49.9856 409.251 47.3996 416.004 47.3996C424.48 47.3996 432.957 50.8476 436.979 60.6171C443.301 50.5603 451.49 47.6869 460.685 47.6869C480.798 47.6869 490.711 60.0424 490.711 81.3053V119.521H473.184V81.3053C473.184 71.9669 469.305 64.0651 459.823 64.0651C450.34 64.0651 444.45 72.2542 444.45 81.5927V119.521Z" fill="#292929"></path><path d="M523.25 48.4053V119.521H505.722V48.4053H523.25ZM504.142 28.7227C504.142 42.3712 524.83 42.3712 524.83 28.7227C524.83 15.0742 504.142 15.0742 504.142 28.7227Z" fill="#292929"></path><path d="M536.241 48.6926H552.475L553.768 56.8817C559.228 48.1179 566.555 46.8249 573.738 46.8249C581.065 46.8249 588.105 49.6983 591.984 53.5773L584.082 68.8062C580.491 65.7892 577.186 64.2088 571.439 64.2088C562.245 64.2088 553.768 69.0935 553.768 82.1674V119.521H536.241V48.6926Z" fill="#292929"></path><path d="M651.261 58.4621L651.835 48.6926H668.645V119.521H652.123L651.261 109.177C647.238 117.51 636.176 121.532 628.274 121.676C607.298 121.82 591.782 108.89 591.782 84.035C591.782 59.6114 608.016 46.8249 628.705 46.9686C638.187 46.9686 647.238 51.4223 651.261 58.4621ZM630.285 62.6284C618.648 62.6284 609.31 70.5302 609.31 84.035C609.31 97.5399 618.648 105.585 630.285 105.585C657.869 105.585 657.869 62.6284 630.285 62.6284Z" fill="#292929"></path><path d="M680.616 19.0969H698V119.521H680.616V19.0969Z" fill="#292929"></path><rect width="157.239" height="157.239" rx="22.4628" fill="#643ADD"></rect><path d="M31.8663 111.409C29.3117 107.369 29.3117 102.224 31.8663 98.1837L62.5331 49.6846C69.7999 38.1922 73.4333 32.446 78.7068 32.446C83.9804 32.446 87.6138 38.1922 94.8806 49.6846L103.599 63.473C107.826 70.1583 109.94 73.5009 109.129 76.8572C108.318 80.2135 104.91 82.2287 98.094 86.2591L48.7129 115.459C42.9244 118.881 35.4562 117.086 31.8663 111.409Z" fill="#FAFBFF"></path><path d="M122.809 105.032C122.809 111.811 117.3 117.306 110.505 117.306C103.709 117.306 98.2006 111.811 98.2006 105.032C98.2006 98.254 103.709 92.759 110.505 92.759C117.3 92.759 122.809 98.254 122.809 105.032Z" fill="#ADEE5B"></path></svg>
            </div>
            <TextInput 
                name="email"
                label='username'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder="Логин"
                error={errors.email}
                />
            <TextInput 
                name="password"
                secret={true}
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                error={errors.password}
                />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button disabled={checkForm()} type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
