import mongoose, {Schema, model, Model} from "mongoose";

import {ICurrency} from "../interfaces";

const currencySchema = new Schema(
  {
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    symbol: {type: String, required: true},
    decimals: {type: Number, required: true, default: 2},
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  },
);

currencySchema.index({code: "text"});

const Currency: Model<ICurrency> = mongoose.models.Currency || model("Currency", currencySchema);

export default Currency;
