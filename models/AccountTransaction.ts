import mongoose, {Schema, model, Model} from "mongoose";

import {IAccountTransaction} from "../interfaces";

type TransactionType = "income" | "expense";

const transactionType: TransactionType[] = ["income", "expense"];

const accountTransactionSchema = new Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    title: {type: String, required: true},
    description: {type: String, default: ""},
    account: {type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "TransactionCategory", required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true, default: Date.now},
    type: {
      type: String,
      enum: {
        values: transactionType,
        message: "{VALUE} is not a valid type",
        default: "expense",
        required: true,
      },
    },
  },
  {timestamps: true},
);

accountTransactionSchema.index({title: "text"});

const AccountTransaction: Model<IAccountTransaction> =
  mongoose.models.AccountTransaction || model("AccountTransaction", accountTransactionSchema);

export default AccountTransaction;
