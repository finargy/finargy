import {Types} from "mongoose";
import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";

import {ICurrency, IUser} from "../interfaces";

interface ICurrencySeed extends Omit<ICurrency, "_id"> {
  _id: Types.ObjectId;
}

interface IUserSeed extends Omit<IUser, "_id" | "preferredCurrency"> {
  _id: Types.ObjectId;
  preferredCurrency: Types.ObjectId;
}

/**
 * Currency mock data.
 */
const currencies: ICurrencySeed[] = [
  {
    _id: new Types.ObjectId(),
    name: "Argentine Peso",
    code: "ARS",
    symbol: "$",
  },
  {
    _id: new Types.ObjectId(),
    name: "United States Dollar",
    code: "USD",
    symbol: "u$d",
  },
];

/**
 * Users mock data, contains an admin user and many regular users.
 */
const users: IUserSeed[] = [
  {
    _id: new Types.ObjectId(),
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin"),
    preferredCurrency: currencies[0]._id,
    birthDate: "1990-01-01",
    role: "admin",
    isVerified: true,
  },
];

const hashedPass = bcrypt.hashSync("user");

for (let i = 0; i < 10; i++) {
  users.push({
    _id: new Types.ObjectId(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: hashedPass,
    preferredCurrency: currencies[1]._id,
    birthDate: faker.date.past().toISOString(),
    role: "user",
    isVerified: true,
  });
}

export const seedData = {
  currencies: currencies,
  users: users,
};
