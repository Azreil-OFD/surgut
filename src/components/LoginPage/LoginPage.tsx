import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginPage.module.css";
import AppService from '../../types/AppService';

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const app = new AppService(loginId);
    const data = await app.load();

    if (app.loaded) {
      localStorage.setItem('appServiceState', JSON.stringify(app.data));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Неверный ID.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <input
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="token"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
