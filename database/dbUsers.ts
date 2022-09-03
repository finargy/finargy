import bcrypt from "bcryptjs";

import {Currency, User} from "../models";
import {UserRole} from "../models/User";

import {db} from ".";

/**
 * It checks if the user exists in the database and if the password is correct
 * @param {string} [email] - string = ""
 * @param {string} [password] - string = ""
 * @returns an object with the following properties:
 * _id, name, email, role, preferredCurrency
 */
export const checkUserEmailPassword = async (email: string = "", password: string = "") => {
  await db.connect();
  const user = await User.findOne({email}).lean();

  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const {role, name, _id, preferredCurrency} = user;

  return {
    _id,
    email: email.toLowerCase(),
    name,
    role,
    preferredCurrency,
  };
};

/**
 * It takes an email and a name, checks if the email exists in the database, if it does, it returns the
 * user, if it doesn't, it creates a new user with the email and name, and returns the new user
 * @param {string} oAuthEmail - The email address of the user that is trying to log in.
 * @param {string} oAuthName - The name of the user that was retrieved from the OAuth provider.
 * @returns an object with the following properties:
 * _id, name, email, role, preferredCurrency
 */
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();

  const user = await User.findOne({email: oAuthEmail}).lean();
  const arCurrency = await Currency.findOne({code: "ARS"}).lean();

  if (user) {
    await db.disconnect;
    const {_id, name, email, role, preferredCurrency} = user;

    return {_id, name, email, role, preferredCurrency};
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "user" as UserRole,
    preferredCurrency: arCurrency?._id,
    isVerified: true,
  });

  await newUser.save();
  await db.disconnect();

  const {_id, name, email, role, preferredCurrency} = newUser;

  return {
    _id,
    name,
    email,
    role,
    preferredCurrency,
  };
};
