const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let refreshTokens = []; // Trong thực tế, nên lưu trữ trong DB

const users = [
    { id: 1, username: 'hung105', password: bcrypt.hashSync('123', 8) },
    { id: 2, username: 'hung106', password: bcrypt.hashSync('123', 8) },
];

const authController = {
    login: (req, res) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({message: 'USERNAME_OR_PASSWORD_IS_NOT_CORRECT'});
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 5 });
        const refreshToken  = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 15 });

        refreshTokens.push(refreshToken);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 30 * 1000 });
        res.json({ accessToken });
    },
    
    refreshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
            return res.status(401).send({message: 'COOKIE_IS_EXPIRED'})
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).send({ auth: false, message: 'REFRESH_TOKEN_IS_EXPIRED' });
    
            const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 5 });
            res.json({ accessToken: newAccessToken });
        });
    },

    logout: (req, res) => {
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.clearCookie('refreshToken');
        res.sendStatus(200);
    }
}

module.exports = authController;
