module.exports = (app) => {
  app.post("/", (req, res) => {
    res.json({ message: `Welcome to ${process.env.APP_NAMESPACE}.` });
  });

  app.use(`/auth`, require("./auth.route"));
  app.use(`/cryptocurrency`, require("./cryptocurrency.route"));
  app.use(`/payment`, require("./payment.route"));
  app.use(`/transaction`, require("./transaction.route"));
  app.use(`/trade`, require("./trade.route"));
  app.use(`/user`, require("./user.route"));
  app.use(`/wallet`, require("./wallet.route"));
}