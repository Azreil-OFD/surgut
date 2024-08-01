import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Простая проверка для примера
    if (username) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  };

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
