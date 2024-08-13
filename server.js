require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/auth");
const app = express();

app.use(express.json()); // read data from request body

const users = [
  {
    id: 1,
    username: "John",
    email: "4Vd7v@example.com",
    password: "123",
  },
  {
    id: 2,
    username: "Jane",
    email: "jane@ex.com",
    password: "1233",
  },
  {
    id: 3,
    username: "Jim",
    email: "jim@ex.com",
    password: "12333",
  },
];

app.get("/posts", verifyToken, (req, res) => {
  res.json({ posts: "posts", user: req.user });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
