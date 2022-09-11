import {FC} from "react";

type Props = {
  title: string;
  expense: number;
  incoming: number;
  date: string;
  symbol: string;
};

export const WalletWidget: FC<Props> = ({title, expense, incoming, date, symbol}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{expense}</p>
      <p>{incoming}</p>
      <p>{date}</p>
      <p>{symbol}</p>
    </div>
  );
};
