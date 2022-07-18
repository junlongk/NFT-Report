import { Flex } from "@chakra-ui/react";

import Metamask from "./Header/Metamask";
import Searchbar from "./Header/Searchbar";

export default function Header({ setSearch }) {
  return (
    <Flex
      direction="row"
      justify="center"
      align="center"
      gap={{ base: "5px", sm: "10px", md: "50px", lg: "100px" }}
      mb="20px"
      h="75px"
      w="100%"
      position="sticky"
      top="0px"
      zIndex="1"
      bg="gray.900"
      boxShadow="base"
    >
      <Searchbar setSearch={setSearch} />
      <Metamask />
    </Flex>
  );
}
