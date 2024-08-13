const express = require('express');
const router = express.Router();
require('dotenv').config();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;