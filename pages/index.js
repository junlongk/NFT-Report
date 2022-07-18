import { chakra, Box, Heading } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function Home() {
  return (
    <Box>
      <ChakraBox
        initial={{ opacity: 0 }}
        animate={{ x: [-100, 0], opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <Heading as="h1">Gain extra insight on your NFT portfolio!</Heading>
      </ChakraBox>
    </Box>
  );
}
