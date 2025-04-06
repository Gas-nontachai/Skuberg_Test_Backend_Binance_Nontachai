const { Transaction } = require('../models');

exports.insertTransaction = async (req, res) => {
    const { from_user_id, to_user_id, crypto_id, amount, price_at_trans, transaction_type } = req.body;

    try {
        const transaction = await Transaction.create({
            from_user_id,
            to_user_id,
            crypto_id,
            amount,
            price_at_trans,
            transaction_type
        });

        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (err) {
        res.status(400).json({ error: err.message });
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

exports.getTransactionStatus = async (req, res) => {
    const { transaction_id } = req.body;

    try {
        const transaction = await Transaction.findByPk(transaction_id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ status: transaction.transaction_status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
