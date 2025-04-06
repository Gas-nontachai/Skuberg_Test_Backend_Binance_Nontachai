const { formatDate } = require("../utils/date-helper.js");

const logger = (req, res, next) => {
    const timestamp = formatDate(new Date(), "dd/MM/yyyy HH:mm:ss");
    const method = req.method;
    const path = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${path}`);

    next();
};

module.exports = { logger };
