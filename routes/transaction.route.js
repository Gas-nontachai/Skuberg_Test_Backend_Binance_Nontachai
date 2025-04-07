const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { TransactionController } = require('../controllers');

router.post('/insertTransaction', authenticate, TransactionController.insertTransaction);
router.post('/getTransactionHistory', authenticate, TransactionController.getTransactionHistory); 

module.exports = router;
