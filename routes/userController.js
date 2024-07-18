const {createUser, updateUser , deleteUser, createUserTeste} = require("../services/userService")
const express = require('express');
const {authMiddleware, authMiddlewareAdmin}  = require("../config/auth")
const passwordValidationRules = require('../config/passwordConfig');
const validator = require('validator');

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [User]
 *     summary: Registro novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rpassword:
 *                 type: string
 *               scopeName:
 *                 type: string
 *               abilities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User criado
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     tags: [User]
 *     summary: Atualiza usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rpassword:
 *                 type: string
 *               scopeName:
 *                 type: string
 *               abilities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User atualizado
 *       400:
 *         description: Invalid input
 * 
 *     security:
 *       - BearerAuth: [] 
 */
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Excluir um usuário pelo ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
/**
 * @swagger
 * /users/registeradmins:
 *   post:
 *     summary: Registrar um novo administrador
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               rpassword:
 *                 type: string
 *                 format: password
 *               scopeName:
 *                 type: string
 *               abilities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Administrador registrado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
const register =  async (req, res) => {

    const {firstname, lastname, email, password, rpassword, scopeName, abilities} = req.body;

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Corpo de requisição não pode ser vazio!" });
    }

    const missingFields = ['firstname', 'lastname', 'email', 'password', 'scopeName', 'rpassword', 'abilities'].filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
    }

    if (password !== rpassword) {
        return res.status(400).json({ message: `As senhas não coincidem!` });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Formato inválido de email!' });
    }

    const passwordErrors = passwordValidationRules(password);
    if (passwordErrors.length) {
        return res.status(400).json({ message: `Erro de validação: ${passwordErrors.join(' ')}` });
    }

    try {
        
        const newUser = await createUser(firstname, lastname, email, password, scopeName, abilities);
        delete newUser.dataValues.password;
        
        return res.status(201).json({ message: 'Usuario criado!', user: newUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {

    const updates = req.body;

    const userId = req.params.id;

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Corpo de requisição não pode ser vazio!" });
    }

    const missingFields = ['firstname', 'lastname', 'email', 'password', 'scopeName', 'abilities', 'rpassword'].filter(field => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
    }

    if(req.body.password !== req.body.rpassword){
        return res.status(400).json({ message: `As senhas não coincidem!` });
    }

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Formato inválido de email!' });
    }
    
    const passwordErrors = passwordValidationRules(req.body.password);
    if (passwordErrors.length) {
        return res.status(400).json({ message: `Erro de validação: ${passwordErrors.join(' ')}` });
    }

    try {
        const updatedUserRes =  await updateUser(userId, updates, req.userId);
        return res.status(200).json({ message: 'Usuario atualizado!', user: updatedUserRes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

const router = express.Router();
router.post('/register', register);
router.put('/update/:id', authMiddleware, update);

router.post('/registeradmins', authMiddlewareAdmin, async (req, res) => {
    try {

        const missingFields = ['firstname', 'lastname', 'email', 'password', 'scopeName', 'abilities', 'rpassword'].filter(field => !req.body[field]);
        if (missingFields.length) {
            return res.status(400).json({ message: `Por favor insira: ${missingFields.join(', ')}` });
        }

        const { firstname, lastname, email, password, scopeName, abilities, rpassword } = req.body;

        if (password !== rpassword) {
            return res.status(400).json({ message: `As senhas não coincidem!` });
        }

        const user = await createUserTeste(firstname, lastname, email, password, scopeName, abilities);
        delete user.dataValues.password;
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/delete/:id', authMiddlewareAdmin, async (req, res) => {
    const response = await deleteUser(req.userId);
    res.status(204).send(response);
});

module.exports = router;