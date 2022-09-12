import {Box} from "@chakra-ui/react";
import Head from "next/head";
import {FC, ReactNode, useContext} from "react";

import {Navbar} from "../ui";
import {UIContext} from "../../context/ui";

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const MainLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  const {isSidebarOpen} = useContext(UIContext);

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

      <nav>
        <Navbar />
      </nav>

      {/* Main content */}
      <main>
        <Box ml={{base: 0, md: isSidebarOpen ? 60 : 20}} transition="all 0.3s">
          {children}
        </Box>
      </main>

      <footer>{/* footer component */}</footer>
    </>
  );
};
