import React from 'react';
import LoginForm from '../components/Login';
import Header from '../components/Header';

const LoginPage = ({ onLogin }) => {
    return (
        <div className="">
            <Header />
            <LoginForm onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
