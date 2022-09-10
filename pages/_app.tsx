import type {AppProps} from "next/app";

import {SessionProvider} from "next-auth/react";
import {ChakraProvider} from "@chakra-ui/react";

import {AuthProvider} from "../context/auth";
import {UIProvider} from "../context/ui";
import {theme} from "../theme";
import "../styles/globals.css";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <UIProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </UIProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
