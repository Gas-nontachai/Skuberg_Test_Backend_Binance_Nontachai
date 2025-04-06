const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { PaymentController } = require('../controllers');

router.post('/insertPayment', authenticate, PaymentController.insertPayment);
router.post('/getPaymentHistory', authenticate, PaymentController.getPaymentHistory);

module.exports = router;
