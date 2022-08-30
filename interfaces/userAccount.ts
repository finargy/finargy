import {ICurrency} from "./currency";
import {IUser} from "./user";

export interface IUserAccount {
  _id: string;
  name: string;
  icon: string;
  user: IUser;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  preferedCurrency: ICurrency;
  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
}
