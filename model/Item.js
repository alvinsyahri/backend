const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    serialNumber: {
        type: String,
       required: true 
    },
    procurementYear: {
        type: String,
       required: true 
    },
    condition: {
        type: Number,
        default: 0 
    },
    qty: {
        type: Number,
        default: 1
    },
    description: {
        type: String
    },
    subCategoryId: {
        type: ObjectId,
        ref: 'SubCategory'
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

module.exports = mongoose.model('Item', itemSchema);