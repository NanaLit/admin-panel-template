import React, {useState} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import AlertModal from '../../components/AlertModal/AlertModal';


const Login: React.FC = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleShowAlert = (message: string) => {
        setShowAlert(true);
        setErrorMessage(message);
    };

    const handleHideAlert = () => {
        console.log('Alert confirmed');
    };

    return (
        <div>
            <LoginForm onLoginError={handleShowAlert} />
            <AlertModal 
                showAlert={showAlert} 
                message={errorMessage}
                setShowAlert={setShowAlert}
                alertConfirm={() => handleHideAlert}
                />
        </div>
    );
};

export default Login;