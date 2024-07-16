const {createUser, updateUser} = require("../services/userService")
const express = require('express');
const authMiddleware  = require("../config/auth")
const passwordValidationRules = require('../config/passwordConfig');
const validator = require('validator');


const register =  async (req, res) => {

    const {firstname, lastname, email, password} = req.body;

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Corpo de requisição não pode ser vazio!" });
    }

    const missingFields = ['firstname', 'lastname', 'email', 'password'].filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Formato inválido de email!' });
    }

    const passwordErrors = passwordValidationRules(password);
    if (passwordErrors.length) {
        return res.status(400).json({ message: `Erro de validação: ${passwordErrors.join(' ')}` });
    }

    try {
        
        const newUser = await createUser(firstname, lastname, email, password);
        delete newUser.dataValues.password;
        
        return res.status(201).json({ message: 'Usuario criado!', user: newUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {

    const updates = req.body;

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Corpo de requisição não pode ser vazio!" });
    }

    const missingFields = ['firstname', 'lastname', 'email', 'password'].filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
    }

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Formato inválido de email!' });
    }
    
    if (updates.password) {
        updates.password = await User.hashPassword(updates.password);
    }

    const passwordErrors = passwordValidationRules(req.body.password);
    if (passwordErrors.length) {
        return res.status(400).json({ message: `Erro de validação: ${passwordErrors.join(' ')}` });
    }

    try {
        const updatedUserRes =  await updateUser(req.userId, updates);
        return res.status(200).json({ message: 'Usuario atualizado!', user: updatedUserRes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

const router = express.Router();
router.post('/register', register);
//router.put('/update', authMiddleware, update);


module.exports = router;