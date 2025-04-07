const { User } = require('../models');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    try {
        const usersData = [
            { username: 'admin', email: 'admin@example.com', password: 'admin1234' },
            { username: 'john_doe', email: 'john@example.com', password: '1234' },
            { username: 'jane_doe', email: 'jane@example.com', password: '1234' },
            { username: 'crypto_master', email: 'crypto@master.com', password: '1234' }
        ];

        const usersWithHashedPasswords = await Promise.all(
            usersData.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );

        const users = await User.bulkCreate(usersWithHashedPasswords);
        console.log('=== Seed : Users seeded successfully ===');
        return users;
    } catch (error) {
        console.error('=== Seed(Err) : Error seeding users:', error, " ===");
    }
};

module.exports = seedUsers;
