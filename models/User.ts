import mongoose, {Schema, model, Model} from "mongoose";

import {IUser} from "../interfaces";

type UserRole = "admin" | "user";

const userRoles: UserRole[] = ["admin", "user"];

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    preferredCurrency: {type: mongoose.Schema.Types.ObjectId, ref: "Currency", required: true},
    role: {
      type: String,
      enum: {
        values: userRoles,
        message: "{VALUE} is not a valid role",
        default: "user",
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
