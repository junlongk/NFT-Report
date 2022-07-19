import { chakra, Box, Heading } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function Home() {
  return (
    <Box
      minW={{ base: "330px", sm: "450px", md: "720px", lg: "960px" }}
      m="20px"
    >
      <ChakraBox
        initial={{ opacity: 0 }}
        animate={{ x: [-100, 0], opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <Heading as="h1" size="2xl">
          Gain extra insight into your NFT portfolio!
        </Heading>
      </ChakraBox>
    </Box>
  );
}
