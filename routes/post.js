const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const postsController = require('../controllers/postsController');

router.get('/', verifyToken, postsController.getPosts);

module.exports = router;