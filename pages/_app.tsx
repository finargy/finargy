import type {AppProps} from "next/app";

import {SessionProvider} from "next-auth/react";
import {ChakraProvider} from "@chakra-ui/react";

import {AuthProvider} from "../context/auth";
import {theme} from "../theme";
import "../styles/globals.css";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
