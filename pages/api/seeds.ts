import type {NextApiResponse} from "next";

import {db} from "../../database";
import {seedData} from "../../database/seedData";
import User from "../../models/User";
import Currency from "../../models/Currency";
import Country from "../../models/Country";

/**
 * type of seed data response
 */
type Data = {
  message: string;
};

/**
 * Seeds the database with mock data. This is used for development purposes only.
 * Purges the database before seeding.Then proceeds to seed the Currency, Country and User collections.
 * @param {Object} res The response object.
 */
export default async function handler(res: NextApiResponse<Data>) {
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
