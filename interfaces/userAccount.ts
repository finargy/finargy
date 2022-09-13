import {ICurrency, IUser} from ".";

export interface IUserAccount {
  _id: string;
  name: string;
  icon: string;
  user: IUser | string;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  preferredCurrency: ICurrency | string;
  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface IUserAccountEditables {
  name?: string;
  icon?: string;
  preferredCurrency?: string;
  totalIncome?: number;
  totalExpense?: number;
  totalBalance?: number;
  isActive?: boolean;
  isDeleted?: boolean;
}
