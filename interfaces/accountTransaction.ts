import {ICategory} from "./category";
import {IUserAccount} from "./userAccount";

export interface IAccountTransaction {
  _id: string;
  title: string;
  account: IUserAccount;
  category: ICategory;
  type: string;
  amount: number;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
