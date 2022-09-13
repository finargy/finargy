import {isValidObjectId} from "mongoose";

import {UserAccount} from "../models";
import {IUserAccount, IUserAccountEditables} from "../interfaces";

import {db} from ".";

/**
 * Gets all user accounts from the database
 * returns the user accounts
 * @returns An array of UserAccount objects
 */
export const getAllUserAccounts = async (): Promise<IUserAccount[]> => {
  await db.connect();

  const accounts = await UserAccount.find().lean();

  await db.disconnect();

  return accounts;
};

/**
 * It gets a user account from the database by its id
 * @param {string} id - The id of the user account to get.
 * @param {boolean} [populate] - boolean - If true, the user field will be populated with the
 * user object.
 * @returns A promise that resolves to a user account or null.
 */
export const getUserAccountById = async (
  id: string,
  populate?: boolean,
): Promise<IUserAccount | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const account = populate
    ? await UserAccount.findById(id).populate("user").lean()
    : await UserAccount.findById(id).lean();

  await db.disconnect();

  if (!account) return null;

  return account;
};

/**
 * It returns all the accounts of a user
 * @param {string} userId - The user's id.
 * @returns An array of user accounts
 */
export const getAllUserAccountsByUser = async (userId: string): Promise<IUserAccount[] | null> => {
  if (!isValidObjectId(userId)) return null;

  await db.connect();

  const accounts = await UserAccount.find({user: userId}).lean();

  await db.disconnect();

  if (!accounts) return null;

  return accounts;
};

/**
 * It creates a new user account in the database
 * @param {IUserAccount} accountProps - IUserAccount - This is the object that will
 * be used to create the new account.
 * @returns A new account is being returned.
 */
export const createUserAccount = async (
  accountProps: IUserAccount,
): Promise<IUserAccount | null> => {
  const {user} = accountProps;

  if (!isValidObjectId(user)) return null;

  await db.connect();

  const account = await UserAccount.create(accountProps);

  await db.disconnect();

  return account;
};

/**
 * It updates a user account in the database by its id
 * @param {string} id - The id of the user account to update.
 * @param {IUserAccountEditables} accountProps - IUserAccountEditables - This is the object that will
 * be used to update the account.
 * @returns A promise that resolves to a user account or null.
 */
export const updateUserAccountById = async (
  id: string,
  accountProps: IUserAccountEditables,
): Promise<IUserAccount | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const editedAccount = await UserAccount.findByIdAndUpdate(id, accountProps, {
    new: true,
  }).lean();

  await db.disconnect();

  if (!editedAccount) return null;

  return editedAccount;
};

/**
 * It disables a user account in the database by its id
 * @param {string} id - The id of the user account to disable.
 * @returns A promise that resolves to a user account or null.
 */
export const disableUserAccountById = async (id: string): Promise<IUserAccount | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const account = await UserAccount.findByIdAndUpdate(id, {isActive: false}, {new: true}).lean();

  await db.disconnect();

  if (!account) return null;

  return account;
};

/**
 * It deletes a user account in the database by its id
 * @param {string} id - The id of the user account to delete.
 * @returns A promise that resolves to a user account or null.
 * @description This function will soft delete the user account.
 * It will set the isDeleted field to true.
 * It will not delete the user account from the database.
 */
export const softDeleteUserAccountById = async (id: string): Promise<IUserAccount | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const account = await UserAccount.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).lean();

  await db.disconnect();

  if (!account) return null;

  return account;
};

/**
 * It deletes a user account in the database by its id
 * @param {string} id - The id of the user account to delete.
 * @returns A promise that resolves to a user account or null.
 * @description This function will hard delete the user account.
 * It will delete the user account from the database.
 * It will not set the isDeleted field to true.
 */
export const hardDeleteUserAccountById = async (id: string): Promise<IUserAccount | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const account = await UserAccount.findByIdAndDelete(id).lean();

  await db.disconnect();

  if (!account) return null;

  return account;
};
