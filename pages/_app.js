import { ChakraProvider } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/globals.css";
import { theme } from "../styles/theme";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        <Layout
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </ChakraProvider>
  );
}
