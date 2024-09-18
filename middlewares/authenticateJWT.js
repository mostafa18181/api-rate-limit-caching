const jwt = require('jsonwebtoken');
const ConfigManager = require('../services/configManager');

const {secretKey} = ConfigManager.getJwtSettings();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({message: err.message});
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({message: 'Unauthorized'});
    }
};

module.exports = authenticateJWT;
