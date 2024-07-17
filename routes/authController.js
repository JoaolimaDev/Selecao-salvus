const { loginUser } = require('../services/authService');
const express = require('express');


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Autêntica o usuário!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "testeSalvus@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678@Salvus"
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

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
        return res.status(200).json({ message: loginResult });
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

};

const router = express.Router();
router.post('/login', login);

module.exports = router;
