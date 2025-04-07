const seedUsers = require('./users.seed');
const seedCryptocurrency = require('./crypto.seed');
const seedDeposit = require('./deposit.seed');
const seedWallet = require('./wallet.seed');
const seedTrade = require('./trade.seed');

exports.seedData = async () => {
    try {
        console.log("=== Seeding ===");

        const users = await seedUsers();
        const cryptocurrencies = await seedCryptocurrency();

        for (const user of users) {
            await seedDeposit(user.user_id);
        }

        for (const user of users) {
            for (const crypto of cryptocurrencies) {
                await seedWallet(user.user_id, crypto.crypto_id);
            }
        }

        const trades = Array.from({ length: 5 });
        for (const _ of trades) {
            const random_user = users[Math.floor(Math.random() * users.length)];
            const random_crypto = cryptocurrencies[Math.floor(Math.random() * cryptocurrencies.length)];
            await seedTrade(random_user.user_id, random_crypto.crypto_id);
        }

        console.log('=== Seed : All data seeded successfully ===');
    } catch (error) {
        console.error('=== Seed(Err) : Error seeding data:', error, " ===");
    } finally {
        console.log('===== Seed Data Done! =====');
    }
};
