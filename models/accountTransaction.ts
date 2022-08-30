const mongoose = require('mongoose');

const AccountTransactionSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    title: {type:String, required:true},
    account: {type:mongoose.Schema.Types.ObjectId, ref:'UserAccount', required:true},
    category: {type:mongoose.Schema.Types.ObjectId, ref:'TransactionCategory', required:true},
    type: {type:String, enum:['income', 'expense'], required:true},
    amount: {type:Number, required:true},
    date: {type:Date, required:true, default:Date.now},
    tax: {type:Number, default:0},
    description: {type:String, default:''},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
}).index({title:1}, {unique:true});

export default mongoose.model("AccountTransaction", AccountTransactionSchema);
