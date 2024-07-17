import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      login(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>
    </Container>
  );
};

export default LoginForm;
