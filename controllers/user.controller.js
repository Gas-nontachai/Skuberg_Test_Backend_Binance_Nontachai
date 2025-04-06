const { User } = require('../models');

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