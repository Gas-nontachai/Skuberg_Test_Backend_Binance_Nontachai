const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers/');
const authenticate = require('../middleware/auth.middleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/getSession', authenticate, AuthController.getSession);

module.exports = router;
