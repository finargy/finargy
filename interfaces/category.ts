import {IUser} from ".";

export interface ICategory {
  _id: number;
  name: string;
  icon: string;
  color: string;
  user: IUser;
  createdAt?: string;
  updatedAt?: string;
}
