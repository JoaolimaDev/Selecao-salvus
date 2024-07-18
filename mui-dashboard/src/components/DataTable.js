import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Modal, TextField, Box } from '@mui/material';
import axios from 'axios';

const DataTable = ({ data, fetchData, page, rowsPerPage, setPage, setRowsPerPage, totalCount }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ nome: '', descricao: '', preco: 0 });
  const [newProduct, setNewProduct] = useState({ nome: '', descricao: '', preco: 0 });

  const handleOpenUpdate = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct({ nome: product.nome, descricao: product.descricao, preco: product.preco });
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setCurrentProduct(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/produtos/${currentProduct.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); 
      handleCloseUpdate(); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
    setNewProduct({ nome: '', descricao: '', preco: 0 }); 
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleRegisterSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response =  await axios.post(`http://localhost:3000/produtos`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Produto cadastrado com id : " + response.data.id)
      fetchData(); 
      handleCloseRegister(); 
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.preco}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpenUpdate(row)}>Update</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); 
          }}
        />
      </TableContainer>

      {/* Modal de atualização */}
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: 300, mt: '20%' }}>
          <h2>Update Product</h2>
          <TextField
            label="Name"
            name="nome"
            value={updatedProduct.nome}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="descricao"
            value={updatedProduct.descricao}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="preco"
            type="number"
            value={updatedProduct.preco}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdateSubmit} style={{ marginTop: '16px' }}>
            Update
          </Button>
        </Box>
      </Modal>

      {/* Modal de registro */}
      <Modal open={openRegister} onClose={handleCloseRegister}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: 300, mt: '20%' }}>
          <h2>Register New Product</h2>
          <TextField
            label="Name"
            name="nome"
            value={newProduct.nome}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="descricao"
            value={newProduct.descricao}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="preco"
            type="number"
            value={newProduct.preco}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleRegisterSubmit} style={{ marginTop: '16px' }}>
            Register
          </Button>
        </Box>
      </Modal>
    
      <Button variant="contained" onClick={handleOpenRegister} style={{ marginTop: '16px' }}>
        Register New Product
      </Button>
    </>
  );
};

export default DataTable;
