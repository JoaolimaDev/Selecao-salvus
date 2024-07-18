import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setrPassword] = useState('');
  const [scopeName, setScopeName] = useState('user');
  const [abilities, setAbilities] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        firstname,
        lastname,
        email,
        password,
        rpassword,
        scopeName,
        abilities,
      });
      alert(response.data.message);
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setrPassword('');
      setScopeName('user');
      setAbilities([]);
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
      console.error('Registration failed', error);
    }
  };

  const handleAbilityChange = (e) => {
    setAbilities(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Registrar</Typography>
      <form onSubmit={handleRegister}>
        <TextField label="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} fullWidth margin="normal" />
        <TextField label="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} fullWidth margin="normal" />
        <TextField label="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <TextField label="Confirme sua senha:" type="password" value={rpassword} onChange={(e) => setrPassword(e.target.value)} fullWidth margin="normal" />

        <FormControl fullWidth margin="normal">
          <InputLabel id="abilities-label">Abilities</InputLabel>
          <Select
            labelId="abilities-label"
            id="abilities"
            multiple
            value={abilities}
            onChange={handleAbilityChange}
            fullWidth
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="write">Write</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
        </FormControl>

        <InputLabel id="scopeName-label">Scope Name</InputLabel>
        <FormControl fullWidth margin="normal">
          <Select
            labelId="scopeName-label"
            id="scopeName"
            value={scopeName}
            onChange={(e) => setScopeName(e.target.value)}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
