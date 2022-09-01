import type {NextApiRequest, NextApiResponse} from "next";

import {db, seedData} from "../../database";
import {User, Currency} from "../../models";

/**
 * type of seed data response
 */
type Data = {
  message: string;
};

/**
 * Seeds the database with mock data. This is used for development purposes only.
 * Purges the database before seeding.Then proceeds to seed the Currency and User collections.
 * @param {Object} res The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({message: "Forbidden"});
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedData.users);

  await Currency.deleteMany();
  await Currency.insertMany(seedData.currencies);

  await db.disconnect();

  res.status(200).json({message: "Seeded"});
}
