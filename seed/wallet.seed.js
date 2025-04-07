const { Wallet } = require('../models');

const seedWallet = async (user_id, crypto_id, amount = 10) => {
    try {
        await Wallet.create({
            user_id: user_id,
            crypto_id: crypto_id,
            amount: amount
        });
        console.log(`=== Seed : Added ${amount} of crypto ${crypto_id} to wallet of user ${user_id} ===`);
    } catch (error) {
        console.error('=== Seed(Err) : Error seeding Wallet:', error, " ===");
    }
};

module.exports = seedWallet;
