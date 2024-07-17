import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from '@mui/material';
import DataTable from './DataTable';
import axios from 'axios';

const Dashboard = ({ logout }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('/api/data');
    setData(response.data);
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" onClick={logout}>Logout</Button>
      <DataTable data={data} fetchData={fetchData} />
    </Container>
  );
};

export default Dashboard;
