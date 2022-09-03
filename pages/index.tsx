import type {NextPage} from "next";

import {Text} from "@chakra-ui/react";
import {signOut} from "next-auth/react";
import NextLink from "next/link";

import {MainLayout} from "../components/layouts";

const Home: NextPage = () => {
  return (
    <MainLayout pageDescription="Página principal Finargy" title="Finargy">
      <Text>Index</Text>
      <NextLink href="/auth/login">Login</NextLink>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </MainLayout>
  );
};

export default Home;
