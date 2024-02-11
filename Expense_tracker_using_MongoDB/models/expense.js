const mongoose = require('mongoose');

const Schema = mongoose.Schema
const expenseSchema = new Schema({
    amount: {
        type: Number,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    expenseDate: {
        type: Date,
        default: Date.now,
    },
    payment:{
        type:String

    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Use the correct model name here
    },
});

const Expense = mongoose.model('Expense', expenseSchema);// 'Expense is collection name 

module.exports = Expense;