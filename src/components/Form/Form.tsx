import React from 'react';

import './Form.scss';

interface FormProps {
    children: React.ReactNode;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
    children,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit} className="login">
            {children}
            {/* <button disabled={checkForm()} type="submit">
                Войти
            </button> */}
        </form>
    );
};

export default Form;
