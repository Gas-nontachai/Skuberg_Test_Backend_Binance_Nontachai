const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { UserController } = require('../controllers/');

router.post('/getUserBy', authenticate, UserController.getUserBy);
router.post('/getUserByID', authenticate, UserController.getUserByID);
router.post('/updateUserBy', authenticate, UserController.updateUserBy);
router.post('/deposit', authenticate, UserController.deposit);
router.post('/withdraw', authenticate, UserController.withdraw);
router.post('/CheckBalance', authenticate, UserController.CheckBalance);

module.exports = router;
