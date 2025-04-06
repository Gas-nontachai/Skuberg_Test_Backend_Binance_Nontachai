const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transaction_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("TRX")
        },
        from_user_id: DataTypes.STRING,
        to_user_id: DataTypes.STRING,
        crypto_id: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        price_at_trans: DataTypes.FLOAT,
        transaction_type: DataTypes.STRING
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: "from_user_id", as: "fromUser" });
        Transaction.belongsTo(models.User, { foreignKey: "to_user_id", as: "toUser" });
        Transaction.belongsTo(models.Cryptocurrency, { foreignKey: "crypto_id" });
    };

    return Transaction;
};
