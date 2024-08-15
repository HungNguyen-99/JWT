const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'NO_TOKEN_PROVIDED' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ auth: false, message: 'TOKEN_INVALID' });

        req.role = user.role;
        next();
    });
}

module.exports = verifyToken;