import {isValidObjectId} from "mongoose";

import {AccountTransaction} from "../models";
import {IAccountTransaction, IAccountTransactionEditables} from "../interfaces";

import {db} from ".";

/**
 * Gets all account transactions from the database
 * returns the account transactions
 * @returns An array of AccountTransaction objects
 */
export const getAllAccountTransactions = async (): Promise<IAccountTransaction[]> => {
  await db.connect();

  const transactions = await AccountTransaction.find().lean();

  await db.disconnect();

  return transactions;
};

/**
 * It gets an account transaction from the database by its id
 * @param {string} id - The id of the account transaction to get.
 * @param {boolean} [populate] - boolean - If true, the account field will be populated with the
 * account object.
 * @returns A promise that resolves to an account transaction or null.
 */
export const getAccountTransactionById = async (
  id: string,
  populate?: boolean,
): Promise<IAccountTransaction | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const transaction = populate
    ? await AccountTransaction.findById(id).populate("account").lean()
    : await AccountTransaction.findById(id).lean();

  await db.disconnect();

  if (!transaction) return null;

  return transaction;
};

/**
 * It creates a new account transaction in the database
 * @param {IAccountTransaction} transactionProps - IAccountTransaction - This is the object that will
 * be used to create the new transaction.
 * @returns A new transaction is being returned.
 */
export const createAccountTransaction = async (
  transactionProps: IAccountTransaction,
): Promise<IAccountTransaction | null> => {
  const {account, category} = transactionProps;

  if (!isValidObjectId(account) || !isValidObjectId(category)) return null;

  await db.connect();

  const newTransaction = await AccountTransaction.create(transactionProps);

  await db.disconnect();

  return newTransaction;
};

/**
 * Updates an account transaction from database by id.
 * @param {IAccountTransaction} modifiedProps - IAccountTransaction - This is the object that
 * contains the properties of the transaction that we want to update and the _id of transaction.
 * @returns A promise that resolves to an account transaction or null.
 */
export const updateAccountTransactionById = async (
  id: string,
  modifiedProps: IAccountTransactionEditables,
): Promise<IAccountTransaction | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const editedTransaction = await AccountTransaction.findByIdAndUpdate(id, modifiedProps, {
    new: true,
  }).lean();

  await db.disconnect();

  if (!editedTransaction) return null;

  return editedTransaction;
};

/**
 * It deletes an account transaction by its id
 * @param {string} id - string - The id of the account transaction to delete.
 * @returns A promise that resolves to an account transaction or null.
 */
export const deleteAccountTransactionById = async (
  id: string,
): Promise<IAccountTransaction | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const deletedTransaction = await AccountTransaction.findByIdAndDelete(id).lean();

  await db.disconnect();

  if (!deletedTransaction) return null;

  return deletedTransaction;
};
