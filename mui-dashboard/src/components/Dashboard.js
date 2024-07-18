import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TextField, Box } from '@mui/material';
import DataTable from './DataTable';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (search) {
      
      try {
        const response = await axios.get(`http://localhost:3000/produtos/${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData([response.data]);
        setTotalCount(1);
      } catch (error) {
        console.error("Error:", error);
        setData([]);
        setTotalCount(0); 
      }
    } else {
      
      const response = await axios.get('http://localhost:3000/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page + 1, 
          limit: rowsPerPage,
        },
      });
      setData(response.data.rows); 
      setTotalCount(response.data.count); 
    }
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); 
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <TextField
          label="Filtro por ID"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          style={{ marginLeft: 'auto' }}
        />
      </Box>
      <DataTable
        data={data}
        fetchData={fetchData}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        totalCount={totalCount}
      />
    </Container>
  );
};

export default Dashboard;
