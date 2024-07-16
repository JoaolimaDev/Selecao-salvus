// services/userService.js
const { User } = require('../models');
const bcrypt = require('bcryptjs'); 
const {generateToken} = require("../config/auth")

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou senha Inválidos!');
  } 
    const token = generateToken(user.id);
    return { token, userId: user.id };
};


module.exports = {
    loginUser
};
