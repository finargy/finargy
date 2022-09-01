import {Country, User} from "../models";

import {db} from ".";

export const getUserOrCreate = async (emailSession: string, nameSession: string) => {
  await db.connect();

  const user = await User.findOne({emailSession}).lean();

  if (user) {
    await db.disconnect();
    const {_id, name, role} = user;

    return {_id, name, role};
  }

  const country = await Country.findOne({name: "Argentina"}).lean();

  const newUser = new User({
    email: emailSession,
    name: nameSession,
    country: country?._id,
    preferredCurrency: country?.currency,
    role: "user",
  });

  await newUser.save();
  await db.disconnect();
  const {_id, name, role} = newUser;

  return {_id, name, role};
};
