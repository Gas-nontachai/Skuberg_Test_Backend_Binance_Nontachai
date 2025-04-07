const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define("Trade", {
        trade_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("TRD")
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crypto_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_type: {
            type: DataTypes.ENUM('buy', 'sell'),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        amount: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        status: {
            type: DataTypes.ENUM('open', 'close'),
            defaultValue: 'open',
        }
    });

    Trade.associate = (models) => {
        Trade.hasOne(models.Payment, { foreignKey: 'trade_id' });
        Trade.belongsTo(models.User, { foreignKey: 'user_id' });
        Trade.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
    };

    return Trade;
};
