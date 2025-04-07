const { Trade, Cryptocurrency, User, Wallet } = require('../models');

exports.openTrade = async (req, res) => {
    try {
        const { user_id, crypto_id, order_type, amount, status } = req.body;

        if (!user_id || !crypto_id || !order_type || !amount || status === undefined) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        if (!['buy', 'sell'].includes(order_type.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid order type. Must be "buy" or "sell".' });
        }

        const cryptocurrency = await Cryptocurrency.findOne({ where: { crypto_id } });
        if (!cryptocurrency) {
            return res.status(404).json({ message: 'Cryptocurrency not found' });
        }

        const user = await User.findOne({ where: { user_id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (order_type.toLowerCase() === 'sell') {
            const wallet = await Wallet.findOne({ where: { user_id, crypto_id } });
            if (!wallet || wallet.amount < amount) {
                return res.status(400).json({ message: 'Insufficient balance in wallet to sell' });
            }
        }

        const price = amount * cryptocurrency.price;

        const newTrade = await Trade.create({
            user_id,
            crypto_id,
            order_type: order_type.toLowerCase(),
            price,
            amount,
            status
        });

        return res.status(201).json({
            message: 'Trade opened successfully',
            trade: newTrade
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while opening the trade' });
    }
};

exports.getTradeBy = async (req, res) => {
    try {
        const trade = await Trade.findAll();
        res.status(201).json(trade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTradeByID = async (req, res) => {
    try {
        const { trade_id } = req.body;
        const trade = await Trade.findByPk(trade_id);

        if (!trade) {
            return res.status(404).json({ message: 'trade not found' });
        }

        res.status(200).json(trade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 