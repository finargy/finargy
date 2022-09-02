import {Types} from "mongoose";
import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";

import {ICurrency, IUser, IUserAccount, ICategory, IAccountTransaction} from "../interfaces";
import {currenciesData, CurrencyData} from "../data/currencies";

interface ICurrencySeed extends Omit<ICurrency, "_id"> {
  _id: Types.ObjectId;
}

interface IUserSeed extends Omit<IUser, "_id" | "preferredCurrency"> {
  _id: Types.ObjectId;
  preferredCurrency: Types.ObjectId;
}

interface IUserAccountSeed extends Omit<IUserAccount, "_id" | "user" | "preferedCurrency"> {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  preferedCurrency: Types.ObjectId;
}

interface ICategorySeed extends Omit<ICategory, "_id" | "user"> {
  _id: Types.ObjectId;
  user: Types.ObjectId;
}

interface IAccountTransactionSeed
  extends Omit<IAccountTransaction, "_id" | "user" | "currency" | "category" | "account"> {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  currency: Types.ObjectId;
  category: Types.ObjectId;
  account: Types.ObjectId;
}

/**
 * Currency mock data.
 */

const currencies: ICurrencySeed[] = currenciesData.map((currency: CurrencyData) => {
  return {
    _id: new Types.ObjectId(),
    ...currency,
  };
});

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
    role: "user",
    isVerified: true,
  });
}

/**
 * User accounts mock data.
 * Each user has 2 accounts, one for each currency.
 */
const userAccounts: IUserAccountSeed[] = [];

users.forEach((user) => {
  userAccounts.push({
    _id: new Types.ObjectId(),
    user: user._id,
    preferedCurrency: currencies[0]._id,
    name: "Cuenta en pesos",
    icon: "fas fa-wallet",
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    isActive: true,
    isDeleted: false,
  });

  userAccounts.push({
    _id: new Types.ObjectId(),
    user: user._id,
    preferedCurrency: currencies[1]._id,
    name: "Cuenta en dolares",
    icon: "fas fa-wallet",
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    isActive: true,
    isDeleted: false,
  });
});

/**
 * Categories mock data.
 */
const categories: ICategorySeed[] = [
  {
    _id: new Types.ObjectId(),
    name: "Food",
    icon: "food",
    color: "#FF0000",
    user: users[0]._id,
  },
  {
    _id: new Types.ObjectId(),
    name: "Salary",
    icon: "salary",
    color: "#00FF00",
    user: users[1]._id,
  },
];

/**
 * Transactions mock data.
 */
const accauntTransactions: IAccountTransactionSeed[] = [];

for (let i = 0; i < 50; i++) {
  accauntTransactions.push({
    _id: new Types.ObjectId(),
    user: users[Math.floor(Math.random() * users.length)]._id,
    account: userAccounts[Math.floor(Math.random() * userAccounts.length)]._id,
    currency: currencies[Math.floor(Math.random() * currencies.length)]._id,
    amount: parseInt(faker.finance.amount()),
    description: faker.lorem.sentence(),
    title: faker.lorem.words(),
    category: categories[Math.floor(Math.random() * categories.length)]._id,
    type: Math.random() > 0.5 ? "income" : "expense",
    date: faker.date.past().toDateString(),
  });
}

export const seedData = {
  currencies: currencies,
  users: users,
  categories: categories,
  accauntTransactions: accauntTransactions,
  userAccounts: userAccounts,
};
