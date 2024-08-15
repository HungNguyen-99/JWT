const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const settingControler = require('../controllers/settingControler');
const isAdmin = require('../middleware/isAdmin');

router.get('/', verifyToken, isAdmin, settingControler.getSetting);

module.exports = router;
