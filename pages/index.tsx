import type {NextPage} from "next";

import {Box, Heading, Link} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Heading>Finargy</Heading>

      <Link href="/api/auth/login">Login</Link>
    </Box>
  );
};

export default Home;
