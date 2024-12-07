import React from 'react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoutes: React.FC = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
