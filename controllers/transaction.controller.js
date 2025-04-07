const { User, Transaction } = require('../models');
const { Op } = require('sequelize');

exports.insertTransaction = async (req, res) => {
    const { from_user_id, to_user_id, amount } = req.body;

    try {
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        const fromUser = await User.findOne({ where: { user_id: from_user_id } });
        const toUser = await User.findOne({ where: { user_id: to_user_id } });

        if (!fromUser) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        if (!toUser) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        if (fromUser.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        fromUser.balance -= amount;
        toUser.balance += amount;

        const transaction = await Transaction.create({
            from_user_id,
            to_user_id,
            amount,
            transaction_type: 'transfer',
            status: 'completed',
        });

        await fromUser.save();
        await toUser.save();

        res.status(201).json({ message: 'Transaction successfully', transaction });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getTransactionHistory = async (req, res) => {
    const { user_id } = req.body;

    try {
        const transactions = await Transaction.findAll({
            where: {
                [Op.or]: [{ from_user_id: user_id }, { to_user_id: user_id }]
            }
        });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTransactionBy = async (req, res) => {
    try {
        const transaction = await Transaction.findAll();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
