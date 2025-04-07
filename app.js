const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();
const cors = require('cors');
const { logger } = require("./middleware/logger.middleware.js");
const session = require('express-session');
const { seedData } = require('./seed/seedData.js');

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 86400000 }
}));

db.sequelize.sync().then(() => {
    console.log('===== Database Connected! =====');
    app.listen(process.env.APP_PORT || 3000, () =>
        console.log(`===== Server running on port ${process.env.APP_PORT} =====`)
    );
    seedData();
});

require('./routes')(app)
