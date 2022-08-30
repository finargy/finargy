import mongoose, {Schema, model, Model} from "mongoose";

import {IUserAccount} from "../interfaces";

const userAccountSchema = new Schema(
  {
    name: {type: String, required: true},
    icon: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    totalIncome: {type: Number, default: 0},
    totalExpense: {type: Number, default: 0},
    totalBalance: {type: Number, default: 0},

    preferedCurrency: {type: mongoose.Schema.Types.ObjectId, ref: "Currency", required: true},
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
  },
  {timestamps: true},
);

const UserAccount: Model<IUserAccount> =
  mongoose.models.UserAccount || model("UserAccount", userAccountSchema);

export default UserAccount;
