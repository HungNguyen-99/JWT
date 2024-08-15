require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:49191', 
    credentials: true 
}));

app.use(bodyParser.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth");
const postRoutes = require('./routes/post');
const settingRoutes = require('./routes/setting');

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/setting", settingRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
