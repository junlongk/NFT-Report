import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box mt="40px" w="100%">
      <Text
        fontSize="xs"
        textAlign="center"
        mt="20px"
        pb="20px"
        fontFamily="Open Sans"
      >
        <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2022 NFT
        Report
      </Text>
    </Box>
  );
}
