import Head from "next/head";
import {FC, ReactNode} from "react";

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const MainLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        {/* meta tags */}
        <meta content={pageDescription} name="description" />

        <meta content={title} name="og:title" />
        <meta content={pageDescription} name="og:description" />

        {imageFullUrl && <meta content={imageFullUrl} name="og:image" />}
      </Head>

      <nav>{/* navbar component */}</nav>

      <main>{children}</main>

      <footer>{/* footer component */}</footer>
    </>
  );
};
