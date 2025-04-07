const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Cryptocurrency = sequelize.define("Cryptocurrency", {
        crypto_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("CRY")
        },
        name: DataTypes.STRING,
        symbol: DataTypes.STRING,
        price: DataTypes.FLOAT
    });

    Cryptocurrency.associate = (models) => {
        Cryptocurrency.hasMany(models.Wallet, { foreignKey: "crypto_id" }); 
        Cryptocurrency.hasMany(models.Trade, { foreignKey: 'crypto_id' });
    };

    return Cryptocurrency;
};
