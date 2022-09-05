import type {NextApiRequest, NextApiResponse} from "next";

import {IUserAccount, IUserAccountEditables} from "../../../../interfaces";
import {
  createUserAccount,
  getUserAccountById,
  getAllUserAccounts,
  updateUserAccountById,
  disableUserAccountById,
  softDeleteUserAccountById,
  hardDeleteUserAccountById,
} from "../../../../database/dbUserAccounts";
import {checkContainFields} from "../../../../utils";

type Data = {error?: any; message: string} | {data: IUserAccount} | {data: IUserAccount[]};

/**
 * Handles requests to the /api/accounts/useraccounts endpoint.
 * @param req The request object.
 * @param res The response object.
 * @returns The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        // /api/accounts/useraccounts/:id
        return getAccount(req, res);
      }

      // /api/accounts/useraccounts/
      return getAllAccounts(res);
    case "POST":
      // /api/accounts/useraccounts/
      return postAccount(req, res);
    case "PUT":
      if (req.query.disable) {
        // /api/accounts/useraccounts/:id/disable
        return disableAccount(req, res);
      } else if (req.query.softDelete) {
        // /api/accounts/useraccounts/:id/softDelete
        return softDeleteAccount(req, res);
      }

      // /api/accounts/useraccounts/:id
      return putAccount(req, res);
    case "DELETE":
      // /api/accounts/useraccounts/:id
      return deleteAccount(req, res);

    default:
      return res.status(405).json({message: "Method not allowed"});
  }
}

/**
 * Gets all user accounts from the database.
 * @param res The response object. Contains all the user accounts.
 * @returns All user accounts for a user.
 */
const getAllAccounts = async (res: NextApiResponse<Data>) => {
  try {
    const userAccounts = await getAllUserAccounts();

    return res.status(200).json({data: userAccounts});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Gets a user account from the database.
 * @param req The request object. Contains the id of the user account to get.
 * @param res The response object. Contains the user account.
 * @returns The user account.
 */
const getAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const userAccount = await getUserAccountById(req.query.id as string);

    return res.status(200).json({data: userAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Deletes a user account from the database.
 * @param req The request object. Contains the id of the user account to delete.
 * @param res The response object. Contains the user account.
 * @returns The user account.
 */
const deleteAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const userAccount = await hardDeleteUserAccountById(req.query.id as string);

    return res.status(200).json({data: userAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};
