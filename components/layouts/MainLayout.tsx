import {Box} from "@chakra-ui/react";
import Head from "next/head";
import {FC, ReactNode} from "react";
import {useDisclosure} from "@chakra-ui/react";

import {Navbar} from "../ui";
import {Sidebar} from "../ui";

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const MainLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

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

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

      {/* Main content */}
      <Box ml={{base: 0, md: isOpen ? 60 : 20}} transition="all 0.3s">
        Lorem Ipsum
      </Box>

      {/* <nav> <Navbar /> </nav> */}

      <main>
        <Box pt={{base: "0", sm: "80px"}}>{children}</Box>
      </main>

      <footer>{/* footer component */}</footer>
    </>
  );
};
