import {IUser} from "./user";

export interface IUserValidation {
  _id: string;
  user: IUser | string;
  token: string;
  expiration: string;
  createdAt: string;
  updatedAt: string;
}
