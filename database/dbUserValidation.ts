import {isValidObjectId} from "mongoose";

import {UserValidation} from "../models";
import {IUserValidation} from "../interfaces";

import {db, dbUsers} from ".";

/**
 * It creates a new user validation document in the database
 * @param {string} userId - the user's id
 * @param {string} token - The token that will be sent to the user's email.
 * @param {Date} expiration - Date
 * @returns A new user validation object
 */
export const createUserValidation = async (
  userId: string,
  token: string,
  expiration: Date,
): Promise<IUserValidation | null> => {
  await db.connect();

  const user = await dbUsers.getUserById(userId);

  if (!user) {
    await db.disconnect();

    return null;
  }

  const newUserValidation = new UserValidation({user: user._id, token, expiration});

  await newUserValidation.save();
  await db.disconnect();

  return newUserValidation;
};

/**
 * Get User Validation from the database by its token
 * @param {string} token - The token that was sent to the user's email.
 * @returns UserValidation or null
 * */
export const getUserValidation = async (token: string): Promise<IUserValidation | null> => {
  await db.connect();

  const userValidation = await UserValidation.findOne({token}).lean();

  await db.disconnect();

  if (!userValidation) return null;

  return userValidation;
};

/**
 * It hard deletes a user validation by id
 * @param {string} id - string - The id of the user validation to delete.
 * @returns The deleted user validation
 */
export const hardDeleteUserValidationById = async (id: string): Promise<IUserValidation | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();

  const deletedUserValidation = await UserValidation.findByIdAndDelete(id);

  if (!deletedUserValidation) return null;

  return deletedUserValidation;
};
