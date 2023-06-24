import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice';
import { registerLoginSchema } from '../Shared/validation/registerSchema';
import { msgSuccessfulRegister } from '../utils/notification';
import { AuthForm } from '../components/AuthForm ';


export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { status } = useSelector(state => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) msgSuccessfulRegister();

        if (isAuth) navigate('/');
    }, [isAuth, navigate, status]);

    const handleSubmit = async () => {
        try {
            await registerLoginSchema.validate({ username, password });
            await dispatch(registerUser({ username, password }));
            setError('');
            setPassword('');
            setUsername('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthForm
            title="Registration"
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSubmit}
            buttonText="Register"
            secondaryText="Already have an account?"
            secondaryLink="/login"
        />
    );
};
