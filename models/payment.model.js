const { generateID } = require("../utils/generator-id");

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        payment_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => generateID("PAY")
        },
        from_user_id: DataTypes.STRING,
        to_user_id: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        payment_method: DataTypes.STRING
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, { foreignKey: "from_user_id", as: "payer" });
        Payment.belongsTo(models.User, { foreignKey: "to_user_id", as: "receiver" });
    };

    return Payment;
};
