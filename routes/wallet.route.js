const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { WalletController } = require('../controllers');
 
router.post('/insertWallet', authenticate, WalletController.insertWallet);
router.post('/subtractFromWallet', authenticate, WalletController.subtractFromWallet);
router.post('/getWalletBalance', authenticate, WalletController.getWalletBalance);

module.exports = router;
