import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../database";
import {AccountTransaction} from "../../models";

const getAllTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const allTransactions = await AccountTransaction.find();

  await db.disconnect();

  return res.status(200).json({data: allTransactions});
};

const getTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await AccountTransaction.findById(req.query.id);
  await db.disconnect();
};

const postTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await AccountTransaction.create(req.body);
  await db.disconnect();
};

const putTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await AccountTransaction.findOneAndUpdate({id: req.query.id}, req.body);
  await db.disconnect();
};

const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await AccountTransaction.findOneAndDelete({id: req.query.id});
  await db.disconnect();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        return getTransaction(req, res);
      }

      return getAllTransactions(req, res);
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
