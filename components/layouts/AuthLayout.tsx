import Head from "next/head";
import {FC, ReactNode} from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export const AuthLayout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
};
