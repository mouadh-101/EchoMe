const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user signup
// POST /api/auth/signup (assuming '/api/auth' prefix in main app)
router.post('/signup', authController.signup);

// Route for user login
// POST /api/auth/login (assuming '/api/auth' prefix in main app)
router.post('/login', authController.login);

module.exports = router;
