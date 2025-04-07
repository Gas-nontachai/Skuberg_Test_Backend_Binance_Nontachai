const { User, Transaction } = require('../models');

exports.getUserBy = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserBy = async (req, res) => {
    try {
        const { user_id, username, email, balance } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await user.update({
            username: username || user.username,
            email: email || user.email,
            balance: balance || user.balance
        });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deposit = async (req, res) => {
    try {
        const { user_id, balance } = req.body;

        if (balance <= 0) {
            return res.status(400).json({ message: 'Deposit balance must be greater than zero' });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.balance += balance;
        await user.save();

        const transaction = await Transaction.create({
            from_user_id: null,
            to_user_id: user_id,
            amount: balance,
            transaction_type: 'deposit',
            status: 'completed'
        });

        res.status(200).json({ message: `Deposit of ${balance} successful`, balance: user.balance, transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.withdraw = async (req, res) => {
    try {
        const { user_id, balance } = req.body;

        if (balance <= 0) {
            return res.status(400).json({ message: 'Withdraw balance must be greater than zero' });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.balance < balance) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        user.balance -= balance;
        await user.save();

        const transaction = await Transaction.create({
            from_user_id: user_id,
            to_user_id: null,
            amount: balance,
            transaction_type: 'withdraw',
            status: 'completed'
        });

        res.status(200).json({ message: `Withdrawal of ${balance} successful`, balance: user.balance, transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.CheckBalance = async (req, res) => {
    try {
        const { user_id } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 