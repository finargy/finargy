import {ICategory, IUserAccount} from ".";

export interface IAccountTransaction {
  _id: string;
  title: string;
  account: IUserAccount | string;
  category: ICategory | string;
  type: string;
  amount: number;
  date: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAccountTransactionEditables {
  title?: string;
  description?: string;
  category?: string;
  type?: string;
  amount?: number;
  date?: Date;
}
