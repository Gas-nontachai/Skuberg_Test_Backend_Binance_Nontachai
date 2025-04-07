const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { PaymentController } = require('../controllers');

router.post('/paymentOrder', authenticate, PaymentController.paymentOrder);
router.post('/getPaymentBy', authenticate, PaymentController.getPaymentBy);

module.exports = router;
