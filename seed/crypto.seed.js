const { Cryptocurrency } = require('../models');

const seedCryptocurrency = async () => {
    try {
        const cryptocurrencies = await Cryptocurrency.bulkCreate([
            { "name": "Polygon", "symbol": "MATIC", "price": 0.88 },
            { "name": "Bitcoin", "symbol": "BTC", "price": 55000 },
            { "name": "Ethereum", "symbol": "ETH", "price": 1800 },
            { "name": "Cardano", "symbol": "ADA", "price": 1.55 },
            { "name": "Solana", "symbol": "SOL", "price": 40.20 }
        ]);
        console.log('=== Seed : Cryptocurrencies seeded successfully ===');
        return cryptocurrencies;
    } catch (error) {
        console.error('=== Seed(Err) : Error seeding cryptocurrencies:', error, " ===");
    }
};

module.exports = seedCryptocurrency;
