import type {NextApiResponse, NextApiRequest} from "next";

import {db, seedData} from "../../database";
import {Currency, User, UserAccount, Category, AccountTransaction} from "../../models";

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

  await Currency.deleteMany();
  await Currency.insertMany(seedData.currencies);

  await User.deleteMany();
  await User.insertMany(seedData.users);

  await UserAccount.deleteMany();
  await UserAccount.insertMany(seedData.userAccounts);

  await Category.deleteMany();
  await Category.insertMany(seedData.categories);

  await AccountTransaction.deleteMany();
  await AccountTransaction.insertMany(seedData.accauntTransactions);

  await db.disconnect();

  res.status(200).json({message: "Seeded"});
}
