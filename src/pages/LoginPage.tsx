import React, { useState } from 'react';
import { useNavigate } from "react-router";
import AppService from "../types/AppService.ts";

const Login: React.FC = () => {
    const [loginId, setLoginId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const app = new AppService(loginId);
        const data = await app.load();

        if (data) {
            localStorage.setItem('appServiceState', JSON.stringify(app.data));
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        } else {
            setError('Неверный ID.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-5 text-2xl font-bold">Login</h1>
            <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="token"
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
                Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default Login;
