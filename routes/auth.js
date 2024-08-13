const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const users = [
    { id: 1, username: 'hung105', password: bcrypt.hashSync('123', 8) }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 30 });
    res.status(200).send({ auth: true, token });
});

module.exports = router;