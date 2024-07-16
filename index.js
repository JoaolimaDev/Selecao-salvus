// app.js
const express = require('express');
const app = express();
const userController = require("./routes/userController");
const authController = require("./routes/authController");


app.use(express.json());
app.use("/users", userController);
app.use("/auth", authController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
