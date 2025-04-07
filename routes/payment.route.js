const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { PaymentController } = require('../controllers');

router.post('/paymentOrder', authenticate, PaymentController.paymentOrder);

module.exports = router;
