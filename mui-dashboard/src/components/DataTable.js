import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import axios from 'axios';

const DataTable = ({ data, fetchData }) => {
  const handleDelete = async (id) => {
    await axios.delete(`/api/data/${id}`);
    fetchData();
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleDelete(row.id)}>Delete</Button>
                {/* Add Edit functionality here */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} count={data.length} rowsPerPage={5} />
    </TableContainer>
  );
};

export default DataTable;
