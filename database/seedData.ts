import {Types} from "mongoose";
import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";

import {ICountry, ICurrency, IUser} from "../interfaces";

interface ICurrencySeed extends Omit<ICurrency, "_id"> {
  _id: Types.ObjectId;
}

interface ICountrySeed extends Omit<ICountry, "_id" | "currency"> {
  _id: Types.ObjectId;
  currency: Types.ObjectId;
}
interface IUserSeed extends Omit<IUser, "_id" | "country" | "preferredCurrency"> {
  _id: Types.ObjectId;
  country: Types.ObjectId;
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
 * Cuntry mock data.
 */
const countries: ICountrySeed[] = [
  {
    _id: new Types.ObjectId(),
    name: "Argentina",
    currency: currencies[0]._id,
  },
  {
    _id: new Types.ObjectId(),
    name: "United States",
    currency: currencies[1]._id,
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
    country: countries[0]._id,
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
    country: countries[1]._id,
    preferredCurrency: currencies[1]._id,
    birthDate: faker.date.past().toISOString(),
    role: "user",
    isVerified: true,
  });
}

export const seedData = {
  currencies: currencies,
  countries: countries,
  users: users,
};
