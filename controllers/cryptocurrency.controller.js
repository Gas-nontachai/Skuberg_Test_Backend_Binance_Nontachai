const { Op } = require('sequelize');
const { Cryptocurrency } = require('../models');

exports.insertCryptocurrency = async (req, res) => {
    const { name, symbol, price } = req.body;

    try {
        const existingCryptocurrency = await Cryptocurrency.findOne({
            where: {
                [Op.or]: [{ name }, { symbol }]
            }
        });

        if (existingCryptocurrency) {
            return res.status(400).json({ error: 'Cryptocurrency name or Symbol already exists' });
        }

        const cryptocurrency = await Cryptocurrency.create({ name, symbol, price });

        res.status(201).json({ message: 'Cryptocurrency created successfully', cryptocurrency });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCryptocurrencyBy = async (req, res) => {
    try {
        const cryptocurrency = await Cryptocurrency.findAll();
        res.status(201).json(cryptocurrency);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCryptocurrencyByID = async (req, res) => {
    try {
        const { crypto_id } = req.body;
        const cryptocurrency = await Cryptocurrency.findByPk(crypto_id);

        if (!cryptocurrency) {
            return res.status(404).json({ message: 'Cryptocurrency not found' });
        }

        res.status(200).json(cryptocurrency);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCryptocurrencyPrice = async (req, res) => {
    try {
        const { crypto_id, price } = req.body;

        const cryptocurrency = await Cryptocurrency.findByPk(crypto_id);

        if (!cryptocurrency) {
            return res.status(404).json({ message: 'Cryptocurrency not found' });
        }

        cryptocurrency.price = price;
        await cryptocurrency.save();

        res.status(200).json({
            message: 'Cryptocurrency price updated successfully',
            cryptocurrency: { id: cryptocurrency.crypto_id, name: cryptocurrency.name, price: cryptocurrency.price }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

