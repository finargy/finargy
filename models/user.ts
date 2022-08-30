const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    country: {type:mongoose.Schema.Types.ObjectId, ref:'Country', required:true},
    preferedCurrency: {type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required:true},
    birthDate: { type: Date, required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
    userRole: {type:String, default:'user', enum:['user', 'admin']},
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", UserSchema);