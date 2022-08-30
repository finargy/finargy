export interface ICurrency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  decimals: number;
  isActive: boolean;
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
}
