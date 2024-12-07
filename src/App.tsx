import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import InfoPage from './pages/InfoPage.tsx';
import GamePage from './pages/GamePage.tsx';
import {ProtectedRoutes} from "./utils/ProtectedRoutes.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Открытые маршруты */}
                <Route path="/login" element={<LoginPage />} />

                {/* Защищенные маршруты */}
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/info" element={<InfoPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
