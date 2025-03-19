import { useState } from 'react';
import './TextInput.scss';

interface InputProps {
    label?: string;
    type?: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error: string;
    secret?: boolean;
}

const TextInput: React.FC<InputProps> = ({ label, type, value, name, onChange, placeholder, error, secret = false }) => {

    const [visualPassword, setVisualPassword] = useState('password');

    const onChanveVisualPassword = () => {
        setVisualPassword(visualPassword === 'password' ? 'text' : 'password');
        console.log('click')
    }
   
    return (
        <label className={`label ${secret ? 'label__secret': ''}`}>
            {label ? <span>{label}</span> : null}
            <div className="label__wrapper">
                <input
                    className={`input`}
                    type={secret ? visualPassword : type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {
                    secret ? 
                    <button type='button' className="input__secret" onClick={onChanveVisualPassword}>
                        {
                            visualPassword == 'text' ?
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            :
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        }
                    </button> 
                    : 
                    null
                }
            </div>
            <div className='error'>{error}</div>
        </label>
    );
};

export default TextInput;
