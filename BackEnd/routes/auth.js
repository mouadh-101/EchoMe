const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/whoami', verifyToken, authController.whoami);
router.put('/profile', verifyToken, authController.updateProfile);
router.put('/password', verifyToken, authController.updatePassword);
router.post('/logout', verifyToken, authController.logout);

router.get('/keep-alive', (req, res) => {
  res.status(200).send({ status: 'alive' });
});

module.exports = router;
