require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const post = require('./routes/post')

app.use("/api/auth", authRoutes);
app.use("/api/post", post);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
