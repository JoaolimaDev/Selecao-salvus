const jwt = require('jsonwebtoken');
const { Token, Ability, User} = require('../models');
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

        const userWithAbilities = await User.findOne({
            where: { id:  decoded.id },
            include: [{
              model: Ability,
              as: 'abilities', 
              attributes: ['name'],
              through: {
                attributes: []
              }
            }]
        });

        req.userId = decoded.id; 
        req.userAbility = userWithAbilities.abilities;
        
        next();
    });
};


const generateToken =  async (userId) => {
    const tokenhash =  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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
    generateToken
};
