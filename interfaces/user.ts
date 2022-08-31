import {ICountry, ICurrency} from ".";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  country: ICountry;
  preferredCurrency: ICurrency;
  birthDate: string;
  role: string;

  isActive?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;

  createdAt?: string;
  updatedAt?: string;
}
