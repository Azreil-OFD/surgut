import React from 'react';
import LoginPage from '../components/LoginPage';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? <Navigate to="/" /> : <LoginPage />;
};

export default Login;
