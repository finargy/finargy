import mongoose, {Schema, model, Model} from "mongoose";

import {ICountry} from "../interfaces";

const countrySchema = new Schema(
  {
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    currency: {type: mongoose.Schema.Types.ObjectId, ref: "Currency", required: true},
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  },
);

const Country: Model<ICountry> = mongoose.models.Country || model("Country", countrySchema);

export default Country;
