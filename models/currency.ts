const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type:String, required:true},
    code: {type:String, required:true},
    decimals: {type:Number, required:true, default:2},
    buyValue: {type:Number, required:true},
    sellValue: {type:Number, required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}).index({name:1}, {unique:true});

export default mongoose.model("Currency", CurrencySchema);
