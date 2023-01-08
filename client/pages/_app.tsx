import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { config } from "@fortawesome/fontawesome-svg-core";

import apolloClient from "../apollo/apollo-client";
import RootLayout from "./layout";

import type { AppProps } from "next/app";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ApolloProvider>
  );
}
