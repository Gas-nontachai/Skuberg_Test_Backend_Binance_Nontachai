const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        req.session._profile = { user_id: user.user_id, username: user.username, email: user.email };
        res.json({
            token,
            user: { user_id: user.user_id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
};

exports.getSession = (req, res) => {
     if (!req.session._profile) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    res.json({
        user: req.session._profile
    });
}; 