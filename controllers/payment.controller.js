const { Payment } = require('../models');

exports.insertPayment = async (req, res) => {
    const { from_user_id, to_user_id, amount, payment_method } = req.body;

    try {
        const payment = await Payment.create({
            from_user_id,
            to_user_id,
            amount,
            payment_method
        });

        res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPaymentHistory = async (req, res) => {
    const { user_id } = req.body;

    try {
        const payments = await Payment.findAll({
            where: {
                [Op.or]: [{ from_user_id: user_id }, { to_user_id: user_id }]
            }
        });

        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
