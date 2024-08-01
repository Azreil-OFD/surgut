import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../utils/router/privateRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
