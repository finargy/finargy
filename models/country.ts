const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type:String, required:true},
    currency: {type:mongoose.Schema.Types.ObjectId, ref:'Currency', required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
});

export default mongoose.model("Country", CountrySchema);