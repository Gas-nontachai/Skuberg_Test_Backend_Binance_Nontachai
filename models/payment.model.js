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
        trade_id: DataTypes.STRING,
        payment_status: {
            type: DataTypes.ENUM('open', 'close'),
            defaultValue: 'open',
        },
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, { foreignKey: "from_user_id", as: "payer" });
    };

    return Payment;
};
