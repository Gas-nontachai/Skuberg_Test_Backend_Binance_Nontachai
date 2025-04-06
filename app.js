const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();
const cors = require('cors');

const { logger } = require("./middleware/logger.middleware.js");

app.use(cors());
app.use(express.json());
app.use(logger);

const authMiddleware = require('./middleware/auth.middleware');
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ msg: 'Protected route', user: req.user });
});

db.sequelize.sync({ force: true }).then(() => {
    console.log('===== Database Connected! =====');
    app.listen(process.env.APP_PORT || 3000, () =>
        console.log(`===== Server running on port ${process.env.APP_PORT} =====`)
    );
});

require('./routes')(app)
