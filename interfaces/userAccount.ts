import {ICurrency, IUser} from ".";

export interface IUserAccount {
  _id: string;
  name: string;
  icon: string;
  user: IUser | string;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  preferedCurrency: ICurrency | string;
  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
}
