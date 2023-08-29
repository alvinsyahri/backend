const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const historyItemSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: 'Item'
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('HistoryItem', historyItemSchema);