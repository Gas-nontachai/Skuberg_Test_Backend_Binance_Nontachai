const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { TradeController } = require('../controllers');

router.post('/openTrade', authenticate, TradeController.openTrade);
router.post('/getTradeBy', authenticate, TradeController.getTradeBy);
router.post('/getTradeByID', authenticate, TradeController.getTradeByID);

module.exports = router;
