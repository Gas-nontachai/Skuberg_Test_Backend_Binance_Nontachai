const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transaction_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("TRN")
        },
        from_user_id: DataTypes.STRING,
        to_user_id: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        transaction_type: DataTypes.STRING,
        status: DataTypes.STRING,
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: "from_user_id", as: "fromUser" });
        Transaction.belongsTo(models.User, { foreignKey: "to_user_id", as: "toUser" });
    };

    return Transaction;
};
