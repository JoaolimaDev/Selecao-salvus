const { loginUser } = require('../services/authService');
const express = require('express');

const login = async (req, res) => {

    const {email, password} = req.body;

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Corpo de requisição não pode ser vazio!" });
    }

    const missingFields = ['email', 'password'].filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
    }

    try {
        const loginResult = await loginUser(email, password);
        return res.status(200).json({ message: 'Usuario autênticado!', token: loginResult });
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

};

const router = express.Router();
router.post('/login', login);

module.exports = router;
