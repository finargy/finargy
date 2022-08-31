import type {NextApiRequest, NextApiResponse} from "next";

import User from "../../models/User";
import {db} from "../../database";
import {seedData} from "../../database/seedData";
import Currency from "../../models/Currency";
import Country from "../../models/Country";

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "production") {
    res.status(403).json({message: "Forbidden"});
  }

  await db.connect();

  await User.deleteMany();
  await Currency.deleteMany();
  await Country.deleteMany();

  await Currency.insertMany(seedData.currencies);
  await Country.insertMany(seedData.countries);
  await User.insertMany(seedData.users);

  await db.disconnect();

  res.status(200).json({message: "Seeded"});
}
