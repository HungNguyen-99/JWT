const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = (req, res, next) => {
    if(req.role !== 'admin') return res.status(403).send({ auth: false, message: 'IS_NOT_ADMIN'});
    next();
}

module.exports = isAdmin;