import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../../../database";
import {AccountTransaction} from "../../../../models";

/**
 * Handles requests to the /api/accounts/transactions endpoint.
 * @param req The request object.
 * @param res The response object.
 * @returns The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        return getTransaction(req, res);
      }

      return getAllTransactions(res);
    case "POST":
      return postTransaction(req, res);
    case "PUT":
      return putTransaction(req, res);
    case "DELETE":
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
const getAllTransactions = async (res: NextApiResponse) => {
  try {
    await db.connect();
    const transactions = await AccountTransaction.find();

    await db.disconnect();

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
const getTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const transaction = await AccountTransaction.findById(req.query.id);

    await db.disconnect();

    // if no transaction is found, return a 404
    if (transaction === null) {
      return res.status(404).json({message: "Transaction not found"});
    }

    // otherwise, return a 200 with the transaction
    return res.status(200).json({data: transaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

const postTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const newTrasaction = await AccountTransaction.create(req.body);

    await db.disconnect();

    return res.status(201).json({data: newTrasaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};

const putTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const updatedTransaction = await AccountTransaction.findOneAndUpdate(
      {_id: req.query.id},
      req.body,
    );

    await db.disconnect();

    return res.status(200).json({data: updatedTransaction});
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
const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  const transactionId = req.query.id;

  try {
    await db.connect();
    const deletedTransaction = await AccountTransaction.findOneAndDelete({
      _id: transactionId,
    });

    await db.disconnect();

    // if no transaction is found, return a 404
    if (deletedTransaction === null) {
      return res.status(404).json({message: "Transaction not found"});
    }

    // otherwise, return a 200 with the deleted transaction's id
    return res.status(200).json({message: "Transaction deleted", data: deletedTransaction});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
};
