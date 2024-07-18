const { loginUser, logout } = require('../services/authService');
const express = require('express');


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autênticações
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: Auth
 *     description: Logout
 *
 * /auth/logout:
 *   get:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
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

router.get('/logout', async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Envie um JWT Bearer token na autênticação!' });
    }

    try {
        const result = await logout(token);
        return res.status(200).json({ message: result });
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

});

module.exports = router;
