import type {NextApiRequest, NextApiResponse} from "next";

import {
  createAccountTransaction,
  getAccountTransactionById,
  getAllAccountTransactions,
  updateAccountTransactionById,
  deleteAccountTransactionById,
} from "../../../../database";
import {IAccountTransaction, IAccountTransactionEditables} from "../../../../interfaces";
import {checkContainFields} from "../../../../utils";

type Data =
  | {error?: any; message: string}
  | {data: IAccountTransaction}
  | {data: IAccountTransaction[]};

/**
 * Handles requests to the /api/accounts/transactions endpoint.
 * @param req The request object.
 * @param res The response object.
 * @returns The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        // /api/accounts/transactions/:id
        return getTransaction(req, res);
      }

      // /api/accounts/transactions/
      return getAllTransactions(res);
    case "POST":
      // /api/accounts/transactions/
      return postTransaction(req, res);
    case "PUT":
      // /api/accounts/transactions/:id
      return putTransaction(req, res);
    case "DELETE":
      // /api/accounts/transactions/:id
      return deleteTransaction(req, res);

    default:
      return res.status(405).json({message: "Method not allowed"});
  }
}

/**
 * Gets all transactions from the database.
 * @param res The response object. Contains all the transactions.
 * @returns All transactions for a user.
 */
const getAllTransactions = async (res: NextApiResponse<Data>) => {
  try {
    const transactions = await getAllAccountTransactions();

    return res.status(200).json({data: transactions});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

/**
 * Gets a single transaction from the database by id.
 * @param res The response object. Contains the transaction.
 * @returns The transaction matching the id.
 */
const getTransaction = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = ""} = req.query as {id: string};

  try {
    const transaction = await getAccountTransactionById(id);

    // if no transaction is found, return a 404
    if (!transaction) {
      return res.status(404).json({message: "Transaction not found"});
    }

    // otherwise, return a 200 with the transaction
    return res.status(200).json({data: transaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

/**
 * This method is called when a POST request is made to the /api/accounts/transactions endpoint.
 * Creates a new transaction in the database.
 * @param req The request object. Contains the transaction body.
 * Required fields: title, account, category, type, amount, date, description
 * @param res The response object. Contains the created transaction.
 * @returns The created transaction.
 */
const postTransaction = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const newTrasactionDict = req.body as IAccountTransaction;

  // required fields
  const requiredFields = ["title", "account", "category", "type", "amount"];

  const missingFields = checkContainFields(requiredFields, newTrasactionDict);

  // if any required fields are missing, return a 400, including the missing fields
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({error: true, message: `Missing required fields: ${missingFields.join(", ")}`});
  }

  try {
    const newTrasaction = await createAccountTransaction(newTrasactionDict);

    if (!newTrasaction) {
      return res.status(400).json({error: true, message: "Mongo ids are not valid"});
    }

    return res.status(201).json({data: newTrasaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

const putTransaction = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = "", ...editTransactionDict} = req.body as {
    id: string;
    editTransactionDict: IAccountTransactionEditables;
  };

  const editableFields = ["title", "category", "type", "amount", "date", "description"];

  if (id.length === 0) {
    return res.status(400).json({error: true, message: "Missing transaction id"});
  }

  if (!editTransactionDict) {
    return res.status(400).json({error: true, message: "No fields to update"});
  }

  const invalidFields = Object.keys(editTransactionDict).filter(
    (field) => !editableFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({error: true, message: `Invalid fields: ${invalidFields.join(", ")}`});
  }

  try {
    const editedTransaction = await updateAccountTransactionById(id, editTransactionDict as any);

    if (!editedTransaction) {
      return res
        .status(404)
        .json({error: true, message: "Account transaction not found or the id is not valid"});
    }

    return res.status(200).json({data: editedTransaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

/**
 * Deletes a single transaction from the database by id.
 * @param res The response object. Contains the deleted transaction.
 * @returns A success message, and the deleted transaction's id.
 */
const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = ""} = req.query as {id: string};

  try {
    const deletedTransaction = await deleteAccountTransactionById(id);

    // if no transaction is found, return a 404
    if (!deletedTransaction) {
      return res.status(404).json({message: "Transaction not found or the id is not valid"});
    }

    // otherwise, return a 200 with the deleted transaction's id
    return res.status(200).json({message: "Transaction deleted", data: deletedTransaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};
