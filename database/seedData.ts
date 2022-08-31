import {faker} from "@faker-js/faker";
import mongoose from "mongoose";

const currencies = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Argentine Peso",
    code: "ARS",
    symbol: "$",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "United States Dollar",
    code: "USD",
    symbol: "u$d",
  },
];

const countries = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Argentina",
    currency: currencies[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "United States",
    currency: currencies[1]._id,
  },
];

const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: "admin",
    country: countries[0]._id,
    preferedCurrency: currencies[0]._id,
    birthDate: "1990-01-01",
    role: "admin",
    isVerified: true,
  },
];

for (let i = 0; i < 10; i++) {
  users.push({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    country: countries[1]._id,
    preferedCurrency: currencies[1]._id,
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
