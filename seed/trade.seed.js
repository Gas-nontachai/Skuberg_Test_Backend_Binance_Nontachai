const { Trade, Cryptocurrency } = require('../models');

const seedTrade = async (user_id, crypto_id) => {
    try {
        const crypto = await Cryptocurrency.findOne({ where: { crypto_id: crypto_id } });
        if (!crypto) {
            throw new Error(`Cryptocurrency with id ${crypto_id} not found`);
        }

        const order_type = Math.random() < 0.5 ? 'buy' : 'sell';
        const amount = Math.floor(Math.random() * 5) + 1;
        const price = amount * crypto.price;

        await Trade.create({
            user_id: user_id,
            crypto_id: crypto_id,
            order_type: order_type,
            amount: amount,
            price: price,
            status: "open"
        });

        console.log(`=== Seed : Added trade Order of crypto ${crypto_id} type ${order_type} for user ${user_id} ===`);
    } catch (error) {
        console.error('=== Seed(Err) : Error seeding Trade:', error, " ===");
    }
};

module.exports = seedTrade;
