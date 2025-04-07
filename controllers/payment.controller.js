const { Payment, Trade, User, Wallet } = require('../models');

const orderBuy = async (user, trade) => {
    if (user.balance < trade.price) {
        throw new Error('Insufficient balance');
    }

    user.balance -= trade.price;
    await user.save();

    let wallet = await Wallet.findOne({ where: { user_id: user.user_id, crypto_id: trade.crypto_id } });
    if (wallet) {
        wallet.amount += trade.amount;
        await wallet.save();
    } else {
        await Wallet.create({
            user_id: user.user_id,
            crypto_id: trade.crypto_id,
            amount: trade.amount
        });
    }
};

const orderSell = async (user, trade) => {
    const wallet = await Wallet.findOne({ where: { user_id: user.user_id, crypto_id: trade.crypto_id } });

    if (!wallet || wallet.amount < trade.amount) {
        throw new Error('Insufficient crypto balance');
    }

    wallet.amount -= trade.amount;
    await wallet.save();

    user.balance += trade.price;
    await user.save();
};

exports.paymentOrder = async (req, res) => {
    const { from_user_id, trade_id } = req.body;

    try {
        const user = await User.findOne({ where: { user_id: from_user_id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const trade = await Trade.findOne({ where: { trade_id } });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        if (trade.status === 'close') {
            return res.status(400).json({ message: 'This trade is already close' });
        }

        if (trade.order_type === 'buy') {
            await orderBuy(user, trade);
        } else if (trade.order_type === 'sell') {
            await orderSell(user, trade);
        } else {
            return res.status(400).json({ message: 'Invalid order type' });
        }

        const payment = await Payment.create({
            from_user_id,
            trade_id,
            payment_status: "close"
        });

        trade.status = 'close';
        await trade.save();

        res.status(201).json({ message: 'Payment successfully', payment });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
