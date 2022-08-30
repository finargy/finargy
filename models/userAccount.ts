const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type:String, required:true},
    icon: {type:String, required:true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    totalIncome: {type:Number, default:0},
    totalExpense: {type:Number, default:0},
    totalBalance: {type:Number, default:0},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
    preferedCurrency: {type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required:true},
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
});

export default mongoose.model("UserAccount", UserSchema);