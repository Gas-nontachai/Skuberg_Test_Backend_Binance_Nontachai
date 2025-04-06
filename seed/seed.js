const db = require('../models');

async function seed() {
  await db.sequelize.sync();

  await db.User.create({
    name: 'Alice',
    email: 'alice@example.com',
    password: '123456'
  });

  console.log('Seeding completed.');
}

seed();
