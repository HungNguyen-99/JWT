const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let refreshTokens = []; // Trong thực tế, nên lưu trữ trong DB

const users = [
    { id: 1, username: 'hung105', password: bcrypt.hashSync('123', 8) }
];

const authController = {
    login: (req, res) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Username or password incorrect');
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 30 });
        const refreshToken  = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 90 });

        refreshTokens.push(refreshToken);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ accessToken });
    },
    
    refreshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);

        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
            const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 30 });
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
