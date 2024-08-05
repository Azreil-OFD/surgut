import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../utils/router/privateRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Info from '../pages/Info';
import Game from '../pages/Game';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
};

export default App;
