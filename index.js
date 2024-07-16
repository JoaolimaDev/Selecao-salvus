// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());
//app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
