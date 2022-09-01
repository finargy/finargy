import {ICurrency} from ".";

export interface ICountry {
  _id: string;
  code: string;
  name: string;
  currency: ICurrency;
  isActive?: boolean;
  isDeleted?: boolean;

  createdAt?: string;
  updatedAt?: string;
}
