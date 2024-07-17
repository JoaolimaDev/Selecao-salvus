import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (token) => {
    setToken(token);
    console.log(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/dashboard" element={token ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
