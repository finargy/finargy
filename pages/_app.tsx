import type {AppProps} from "next/app";

import {SessionProvider} from "next-auth/react";
import {SWRConfig} from "swr";
import {ChakraProvider} from "@chakra-ui/react";

import {AuthProvider} from "../context/auth";
import {UIProvider} from "../context/ui";
import {theme} from "../theme";

import "../styles/globals.css";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
