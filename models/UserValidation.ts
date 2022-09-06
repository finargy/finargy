import mongoose, {Schema, model, Model} from "mongoose";

import {IUserValidation} from "../interfaces";

const userValidationSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true},
    expiration: {type: Date, required: true},
  },
  {
    timestamps: true,
  },
);

const UserValidation: Model<IUserValidation> =
  mongoose.models.UserValidation || model("UserValidation", userValidationSchema);

export default UserValidation;
