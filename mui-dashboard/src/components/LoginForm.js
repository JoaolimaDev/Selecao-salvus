import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      login(response.data.message.token.token);
      navigate('/dashboard'); 
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
      console.error('Login failed', error);
    }
  };

  const handleRegistrationClick = () => {
    navigate('/register'); 
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <Typography align="center" style={{ marginTop: '8px' }}>
          <Link component="button" variant="body2" onClick={handleRegistrationClick}>
            Registrar
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;
