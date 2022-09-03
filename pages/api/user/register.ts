import type {NextApiRequest, NextApiResponse} from "next";

import bcrypt from "bcryptjs";

import {db} from "../../../database";
import {Currency, User} from "../../../models";
import {validations} from "../../../utils";

type Data =
  | {error?: any; message: string}
  | {user: {email: string; role: string; name: string; preferredCurrency: any}};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

/**
 * Register a user in the database
 * @param {NextApiRequest} req - NextApiRequest - This is the request object that Next.js provides. It
 * contains information about the request, such as the body, headers, and query parameters.
 * @param res - NextApiResponse<Data>
 * @returns The user object with the name, email, role and preferredCurrency or an error message
 */
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    name = "",
    email = "",
    password = "",
  } = req.body as {name: string; email: string; password: string};

  if (password.length < 6) {
    return res.status(400).json({message: "The password must be at least 6 characters"});
  }

  if (name.length < 2) {
    return res.status(400).json({message: "The name must have at least 2 characters"});
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({message: "The email is not valid"});
  }

  await db.connect();
  const user = await User.findOne({email});
  const currency = await Currency.findOne({code: "ARS"});

  if (user) {
    await db.disconnect();

    return res.status(400).json({message: "Email already registered"});
  }

  const newUser = new User({
    name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: "user",
    preferredCurrency: currency?._id,
  });

  try {
    await newUser.save({validateBeforeSave: true});
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    // eslint-disable-next-line no-console
    console.log(error);

    return res.status(500).json({message: "User registration error"});
  }

  const {role, preferredCurrency} = newUser;

  return res.status(200).json({
    user: {
      name,
      email,
      role,
      preferredCurrency,
    },
  });
};
