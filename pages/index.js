import { useContext } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  chakra,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { motion, isValidMotionProp, AnimatePresence } from "framer-motion";

import { SearchAddContext } from "../components/Layout";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function Home() {
  const { setSearch } = useContext(SearchAddContext);
  const router = useRouter();
  const sampleEthAdd = process.env.NEXT_PUBLIC_SAMPLE_ETH_ADD;

  const setSampleEthAdd = () => {
    setSearch(sampleEthAdd);
    router.push("/usercollection");
  };

  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        direction="column"
        justify="center"
        align="center"
        minW={{ base: "330px", sm: "450px", md: "720px", lg: "960px" }}
        m="20px"
        textAlign="center"
      >
        <ChakraBox
          initial={{ opacity: 0 }}
          animate={{ x: [-50, 0], opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            ease: "circOut",
            delay: 0.2,
            duration: 1,
          }}
        >
          <Center minH={{ base: "300px", md: "500px" }} p="10px">
            <Heading as="h1" size="2xl" fontFamily="Aboreto">
              Gain extra insight
              <br />
              into your NFT portfolio!
            </Heading>
          </Center>
        </ChakraBox>
        <ChakraBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut", delay: 0.5, duration: 1 }}
          fontFamily="Open Sans"
        >
          <Container mb="100px">
            <Heading
              as="h2"
              size="xl"
              m="20px"
              p="20px"
              bg="gray.700"
              rounded="sm"
              fontFamily="Open Sans"
            >
              Get started!
            </Heading>
            <Text fontSize="md" m="20px" fontWeight="bold">
              Key in the Ethereum wallet address into the search bar!
            </Text>
            <Text fontSize="md" m="20px" fontWeight="bold">
              OR
            </Text>
            <Text fontSize="md" m="20px" fontWeight="bold">
              Connect your Metamask to detect your current wallet!
            </Text>
            <Divider />
            <Text fontSize="md" m="20px" fontWeight="bold">
              If you do not know of any Ethereum address, please click on the
              button below to view a demo using a sample Ethereum address.
            </Text>
            <Button variant="outline" onClick={setSampleEthAdd}>
              Click here!
            </Button>
          </Container>
        </ChakraBox>
      </Flex>
    </AnimatePresence>
  );
}
