import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { registerLoginSchema } from '../Shared/validation/registerSchema';
import { msgSuccessfulLogin } from '../utils/notification';
import { AuthForm } from '../components/AuthForm ';
import { getAuth } from '../redux/selectors';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { status } = useSelector(getAuth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) msgSuccessfulLogin();

        if (isAuth) navigate('/');
    }, [isAuth, navigate, status]);

    const handleSubmit = async () => {
        try {
            await registerLoginSchema.validate({ username, password });
            await dispatch(loginUser({ username, password }));
            setError('');
            setPassword('');
            setUsername('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthForm
            title="Authorization"
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSubmit}
            buttonText="Enter"
            secondaryText="Don't have an account?"
            secondaryLink="/register"
        />
    );
};
