import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../database";
import {AccountTransaction} from "../../models";

const getAllTransactions = async (res: NextApiResponse) => {
  await db.connect();
  const allTransactions = await AccountTransaction.find();

  await db.disconnect();

  return res.status(200).json({data: allTransactions});
};

const getTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const transactionById = await AccountTransaction.findById(req.query.id);

  await db.disconnect();

  return res.status(200).json({data: transactionById});
};

const postTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const newTrasaction = await AccountTransaction.create(req.body);

  await db.disconnect();

  return res.status(201).json({data: newTrasaction});
};

const putTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const updatedTransaction = await AccountTransaction.findOneAndUpdate(
    {id: req.query.id},
    req.body,
  );

  await db.disconnect();

  return res.status(200).json({data: updatedTransaction});
};

const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const deletedTransaction = await AccountTransaction.findOneAndDelete({id: req.query.id});

  await db.disconnect();

  return res.status(200).json({data: deletedTransaction});
};

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
