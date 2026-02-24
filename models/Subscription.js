const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        unique: true,
    },
    keys: {
        auth: String,
        p256dh: String
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Subscription', subscriptionSchema);
