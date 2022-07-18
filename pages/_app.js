import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import { theme } from "../styles/theme";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
