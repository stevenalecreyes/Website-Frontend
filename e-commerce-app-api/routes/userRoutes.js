const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

const { verify, verifyAdmin} = auth;

router.post('/register', userController.register);

// Route for retrieving user details
router.get('/details', verify, userController.getProfile);

// User login and protected route
router.post('/login', userController.login);

module.exports =  router;