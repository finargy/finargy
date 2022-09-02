import type {NextPage} from "next";

import {Text} from "@chakra-ui/react";

import {MainLayout} from "../components/layouts";

const Home: NextPage = () => {
  return (
    <MainLayout pageDescription="Página principal Finargy" title="Finargy">
      <Text>Index</Text>
    </MainLayout>
  );
};

export default Home;
