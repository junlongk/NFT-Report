import { useState } from "react";
import { Box, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import { ethers } from "ethers";

export default function Metamask() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  async function connectMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const bal = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(bal);
    setAccount(accounts[0]);
    setBalance(balanceInEther);
  }

  const disconnectMetamask = () => {
    setAccount(null);
    setBalance(null);
  };

  const renderMetamask = () => {
    if (!account) {
      return (
        <Box minW="160px" align="center">
          <Button
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={() => connectMetamask()}
          >
            <Icon as={CgLogIn} mr="5px" />
            Metamask
          </Button>
        </Box>
      );
    } else {
      return (
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="5px"
          minW="160px"
        >
          <Text fontSize="sm">
            Welcome {account.slice(0, 4) + "..." + account.slice(37, 41)}!
          </Text>
          <Button
            variant="solid"
            colorScheme="blue"
            size="xs"
            onClick={() => disconnectMetamask()}
          >
            <Icon as={CgLogOut} mr="5px" />
            Disconnect
          </Button>
        </Flex>
      );
    }
  };

  return <div>{renderMetamask()}</div>;
}
