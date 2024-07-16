const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1]; // Split and get the token part

    if (!token) {
        return res.status(403).json({ message: 'Envie um JWT Bearer token na autênticação!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

module.exports =  {
    authMiddleware,
    generateToken
};
