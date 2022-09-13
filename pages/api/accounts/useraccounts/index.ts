import type {NextApiRequest, NextApiResponse} from "next";

import {IUserAccount, IUserAccountEditables} from "../../../../interfaces";
import {
  getUserAccountById,
  getAllUserAccounts,
  updateUserAccountById,
  disableUserAccountById,
  softDeleteUserAccountById,
  hardDeleteUserAccountById,
  getAllUserAccountsByUser,
} from "../../../../database/dbUserAccounts";

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
        // /api/accounts/useraccounts?id=id
        return getAccount(req, res);
      } else if (req.query.user) {
        // /api/accounts/useraccounts?user=userID
        return getAccountsByUser(req, res);
      }

      // /api/accounts/useraccounts/
      return getAllAccounts(res);
    case "POST":
    // /api/accounts/useraccounts/
    // TODO: post account
    // return postAccount(req, res);
    case "PUT":
      if (req.query.disable === "true") {
        // /api/accounts/useraccounts/:id/disable
        return disableAccount(req, res);
      } else if (req.query.softDelete === "true") {
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
  const {id = ""} = req.query as {id: string};

  try {
    const userAccount = await getUserAccountById(id);

    if (!userAccount) {
      return res.status(404).json({message: "User account not found"});
    }

    return res.status(200).json({data: userAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Gets all the user accounts for that user
 * @param {NextApiRequest} req - NextApiRequest - This is the request object that Next.js provides. It
 * contains information about the request, such as the query parameters, the body, the headers, etc.
 * @param res - NextApiResponse<Data>
 * @returns An array of user accounts
 */
const getAccountsByUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {user = ""} = req.query as {user: string};

  try {
    const userAccounts = await getAllUserAccountsByUser(user);

    if (!userAccounts) {
      return res.status(404).json({message: "User account not found"});
    }

    return res.status(200).json({data: userAccounts});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Updates a user account in the database.
 * @param req The request object. Contains the id of the user account to update and the new values.
 * @param res The response object. Contains the updated user account.
 * @returns The updated user account.
 */
const putAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = "", ...editAccountDict} = req.body as {
    id: string;
    editAccountDict: IUserAccountEditables;
  };

  const editableFields = [
    "name",
    "icon",
    "preferedCurrency",
    "totalIncome",
    "totalExpense",
    "totalBalance",
  ];

  if (id.length === 0) {
    return res.status(400).json({message: "Missing account id"});
  }

  if (!editAccountDict) {
    return res.status(400).json({message: "No fields to update"});
  }

  const invalidFields = Object.keys(editAccountDict).filter(
    (field) => !editableFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }

  try {
    const editedAccount = await updateUserAccountById(id, editAccountDict as any);

    if (!editedAccount) {
      return res.status(404).json({message: "User account not found"});
    }

    return res.status(200).json({data: editedAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Disables a user account.
 * @param req The request object. Contains the id of the user account to disable.
 * @param res The response object. Contains the disabled user account.
 * @returns The disabled user account.
 */
const disableAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = ""} = req.query as {id: string};

  try {
    const userAccount = await disableUserAccountById(id);

    if (!userAccount) {
      return res.status(404).json({message: "User account not found"});
    }

    return res.status(200).json({data: userAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};

/**
 * Soft deletes a user account.
 * @param req The request object. Contains the id of the user account to soft delete.
 * @param res The response object. Contains the soft deleted user account.
 * @returns The soft deleted user account.
 */
const softDeleteAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = ""} = req.query as {id: string};

  try {
    const userAccount = await softDeleteUserAccountById(id);

    if (!userAccount) {
      return res.status(404).json({message: "User account not found"});
    }

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
  const {id = ""} = req.query as {id: string};

  try {
    const deletedAccount = await hardDeleteUserAccountById(id);

    if (!deletedAccount) {
      return res.status(404).json({message: "User account not found"});
    }

    return res.status(200).json({data: deletedAccount});
  } catch (error: any) {
    //If an error occurs, return a 500
    return res.status(500).json({error, message: "Internal server error"});
  }
};
