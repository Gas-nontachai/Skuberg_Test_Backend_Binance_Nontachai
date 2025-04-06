module.exports = (app) => {
  app.post("/", (req, res) => {
    res.json({ message: `Welcome to ${process.env.APP_NAMESPACE}.` });
  });

  app.use(`/auth`, require("./auth.route"));
  app.use(`/user`, require("./user.route"));
}