import React from 'react';

import './Button.scss';

interface ButtonProps {
    children?: React.ReactNode;
    name?: string;
    type?: "submit" | "reset" | "button" | undefined;
    handleClick?: () => void;
    checkForm: () => boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    name,
    type,
    handleClick,
    checkForm
}) => {
    return (
        <button className='button' disabled={checkForm()} type={type} onClick={handleClick}>
            {children}
            {name}
        </button>
    );
};

export default Button;