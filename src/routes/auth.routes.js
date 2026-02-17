const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/auth.controllers.js')
const {loginUser} = require('../controllers/auth.controllers.js')
/* Post /api/auth/register to register a new user */
    router.post('/register',registerUser);
router.post('/login',loginUser);
    module.exports = router; 