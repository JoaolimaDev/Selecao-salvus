// services/userService.js
const { User, Token } = require('../models');
const bcrypt = require('bcryptjs'); 
const { generateToken } = require("../config/auth")

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou senha Inválidos!');
  } 
  const token = await generateToken(user.id);
  return { token, userId: user.id };
};

const logout = async (token) => {
  const result = await Token.findOne({where: {token}})

  if (!result) {
    throw new Error('Token não encontrado');
  }
  return  await result.destroy();
};

module.exports = {
    loginUser,
    logout
};
