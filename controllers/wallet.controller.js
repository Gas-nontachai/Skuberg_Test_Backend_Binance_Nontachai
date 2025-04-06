const { Wallet } = require('../models');

exports.insertWallet = async (req, res) => {
    const { user_id, crypto_id, amount } = req.body;

    try {
        const wallet = await Wallet.findOne({ where: { user_id, crypto_id } });

        if (wallet) {
            wallet.amount += amount;
            await wallet.save();
        } else {
            await Wallet.create({ user_id, crypto_id, amount });
        }

        res.status(200).json({ message: 'Coins added to wallet successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.subtractFromWallet = async (req, res) => {
    const { user_id, crypto_id, amount } = req.body;

    try {
        const wallet = await Wallet.findOne({ where: { user_id, crypto_id } });

        if (!wallet || wallet.amount < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        wallet.amount -= amount;
        await wallet.save();

        res.status(200).json({ message: 'Coins deducted from wallet successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getWalletBalance = async (req, res) => {
    const { user_id, crypto_id } = req.body;

    try {
        const wallet = await Wallet.findOne({ where: { user_id, crypto_id } });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.status(200).json({ balance: wallet.amount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

