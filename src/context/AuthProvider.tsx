import React, { useState, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';
import { refresh } from './../utils/api';

import AlertModal from '../components/AlertModal/AlertModal';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false') || false
    );

    const [isIntervalStarted, setIsIntervalStarted] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const login = (auth: boolean) => {
        setIsAuthenticated(auth);
        setIsIntervalStarted(true);
    };

    const intervalIdRef = useRef<number | undefined>(undefined);

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        Cookies.remove('token');
        Cookies.remove('token_refresh');
        clearInterval(intervalIdRef.current);
    };

    

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [loginModalMessage, setLoginModalMessage] = useState<string>('');


    const onShowLoginModal = (message: string) => {
        setShowLoginModal(true);
        setLoginModalMessage(message);
    }

    const refreshLogin = () => {
        const refresh_token = Cookies.get('refresh_token');
        if (!refresh_token) {
            if(isIntervalStarted)  {
                logout();
                onShowLoginModal('Войдите, пожалуйста в админимтративную панель.');
                setIsIntervalStarted(false);
            }
            return;
        };

        const token = Cookies.get('token');
        if (token) return;
        refresh().then((res) => {
            if(res.token) {
                Cookies.set('token',  `${res.token}`, {expires: 1 / 1440, path: '/' });
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }).catch(() => {
            logout();
        }).finally(() => {

        })
    }

    

    useEffect(() => {
        refreshLogin();
        if (isIntervalStarted)  {
            intervalIdRef.current = setInterval(refreshLogin, 60 * 1000); 
            
            return () => {
                clearInterval(intervalIdRef.current);
            };
        }

    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshLogin, showLoginModal, setShowLoginModal, loginModalMessage, onShowLoginModal }}>
            {children}
            <AlertModal 
                showAlert={showLoginModal} 
                setShowAlert={setShowLoginModal}
                message={loginModalMessage}
                alertConfirm={() => {setShowLoginModal(false); setIsIntervalStarted(false);}}
            />
        </AuthContext.Provider>
    );
};
