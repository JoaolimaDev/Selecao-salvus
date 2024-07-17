const jwt = require('jsonwebtoken');
const { Token, Ability, User, Scope} = require('../models');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Envie um JWT Bearer token na autênticação!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado!' });
            }
            return res.status(401).json({ message: 'Não autorizado!' });
        }
        
        req.userId = decoded.id; 
        next();
    });
};

const authMiddlewareAdmin = (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Envie um JWT Bearer token na autênticação!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado!' });
            }
            return res.status(401).json({ message: 'Não autorizado!' });
        }

        const userScopes = await User.findOne({
            where: { id: decoded.id },
            include: [{
              model: Scope,
              as: 'scope',
              attributes: ['name'],
            }]
        });

        if (userScopes.scope.name !== "admin") {
            return res.status(401).json({ message: 'Usuário não contém as permissões necessárias!' });
        }
        
        req.userId = decoded.id; 
        next();
    });
};


const generateToken =  async (userId) => {
    const tokenhash =  jwt.sign({ id: userId}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    const newToken = await Token.create({
        token: tokenhash,
        user_id: userId, 
    });
  
    return newToken;
};

module.exports =  {
    authMiddleware,
    generateToken,
    authMiddlewareAdmin
};
