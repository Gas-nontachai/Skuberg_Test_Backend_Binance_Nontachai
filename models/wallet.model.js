const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define("Wallet", {
        wallet_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("WAL")
        },
        user_id: DataTypes.STRING,
        crypto_id: DataTypes.STRING,
        amount: DataTypes.FLOAT
    });

    Wallet.associate = (models) => {
        Wallet.belongsTo(models.User, { foreignKey: "user_id" });
        Wallet.belongsTo(models.Cryptocurrency, { foreignKey: "crypto_id" });
    };

    return Wallet;
};
