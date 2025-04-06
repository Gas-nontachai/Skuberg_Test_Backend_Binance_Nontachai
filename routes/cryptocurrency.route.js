const express = require('express');
const router = express.Router();
const { CryptocurrencyController } = require('../controllers/');
const authenticate = require('../middleware/auth.middleware');

router.post('/insertCryptocurrency', authenticate, CryptocurrencyController.insertCryptocurrency);
router.post('/getCryptocurrencyBy', authenticate, CryptocurrencyController.getCryptocurrencyBy);
router.post('/getCryptocurrencyByID', authenticate, CryptocurrencyController.getCryptocurrencyByID);
router.post('/updateCryptocurrencyPrice', authenticate, CryptocurrencyController.updateCryptocurrencyPrice);

module.exports = router;
