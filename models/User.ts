import mongoose, {Schema, model, Model} from "mongoose";

import {IUser} from "../interfaces";

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true},
    preferedCurrency: {type: mongoose.Schema.Types.ObjectId, ref: "Currency", required: true},
    birthDate: {type: Date, required: true},
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not a valid role",
        default: "client",
        required: true,
      },
    },
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
