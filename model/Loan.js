const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const loanSchema = new mongoose.Schema({
    loanDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    qty: {
        type: Number,
        default: 1
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Loan', loanSchema);