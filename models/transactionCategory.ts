const mongoose = require('mongoose');

const TransactionCategorySchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type:String, required:true},
    icon: {type:String, required:true},
    color: {type:String, required:true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
}).index({name:1}, {unique:true});

export default mongoose.model("TransactionCategory", TransactionCategorySchema);