const { User, Transaction } = require('../models');

const seedDeposit = async (user_id, balance = 1000000) => {
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error('=== Seed(Err) : User not found ===');
        }

        user.balance += balance;
        await user.save();

        await Transaction.create({
            from_user_id: null,
            to_user_id: user_id,
            amount: balance,
            transaction_type: 'deposit',
            status: 'completed'
        });

        console.log(`=== Seed : Deposited ${balance} for user ${user.username} ===`);
    } catch (err) {
        console.error('=== Seed(Err) : Error in deposit:', err.message, " ===");
    }
};

module.exports = seedDeposit;
