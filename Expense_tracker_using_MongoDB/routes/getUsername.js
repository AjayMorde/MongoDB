// routes/getUserName.js
const express = require('express');
const router = express.Router();
const userautheticate=require('../middleware/auth');
const routes = require('../controllers/getUserName');

;
router.get('/username', userautheticate.authenticate, routes.getName);


module.exports = router;
