const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("USR")
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Wallet, { foreignKey: "user_id" });
        User.hasMany(models.Transaction, { foreignKey: "from_user_id", as: "sentTransactions" });
        User.hasMany(models.Transaction, { foreignKey: "to_user_id", as: "receivedTransactions" });
        User.hasMany(models.Payment, { foreignKey: "from_user_id", as: "sentPayments" });
        User.hasMany(models.Trade, { foreignKey: 'user_id' });
    };

    return User;
};
