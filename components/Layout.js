import { createContext, useState } from "react";
import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";

export const SearchAddContext = createContext();

export default function Layout({ children }) {
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <title>NFT Report</title>
        <meta
          name="description"
          content="Gain extra insight into your NFT portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        minH="100vh"
        direction="column"
        justify="space-between"
        align="center"
      >
        <Header setSearch={setSearch} />
        <SearchAddContext.Provider
          value={{ search: search, setSearch: setSearch }}
        >
          <Box>{children}</Box>
        </SearchAddContext.Provider>
        <Footer />
      </Flex>
    </>
  );
}
