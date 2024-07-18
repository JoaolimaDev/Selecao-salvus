import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const navigate = useNavigate();

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        await axios.get('http://localhost:3000/auth/logout', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
      }
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error.data);
      // Handle error if needed
    }
  };

  const handleLogoutAndRedirect = () => {
    logout();
    navigate('/login');
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 && data.message === 'Token expirado!') {
          handleLogoutAndRedirect();
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <div>

      { (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/dashboard" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
              Dashboard
            </Typography>
            <Typography variant="h6" component={Link} to="/login" style={{ textDecoration: 'none', color: 'white' }}>
              Login
            </Typography>
            <Typography variant="h6" component={Link} to="/register" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px', marginRight: '20px' }}>
              Registrar
            </Typography>
            <Typography variant="h6" style={{ marginLeft: 'auto', color: 'white', cursor: 'pointer' }} onClick={logout}>
              Logout
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Main Content */}
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
