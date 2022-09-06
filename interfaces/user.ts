import {ICurrency} from ".";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  preferredCurrency: ICurrency | string;
  role: string;

  isActive?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface IUserEditables {
  name?: string;
  preferredCurrency?: string;
  role?: string;

  isActivate?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
}
