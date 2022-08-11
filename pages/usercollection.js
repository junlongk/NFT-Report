import { useState, useEffect, useContext } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { SearchAddContext } from "../components/Layout";
import NftBox from "../components/NftBox";

export default function UserCollection() {
  const { search } = useContext(SearchAddContext);
  const [etherscanResults, setEtherscanResults] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [totalFP, setTotalFP] = useState(0);

  // Obtain results for both ERC721 & ERC1155 NFT tokens
  useEffect(() => {
    if (search !== "") {
      const getEtherscan721Response = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
          const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${walletAddress}&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=${etherscanAPI}`;
          const etherscan721Response = await fetch(url, {
            method: "GET",
          });
          const fetchES721Results = await etherscan721Response.json();
          fetchES721Results.result.forEach((entry) => {
            entry.type = "721";
          });
          setEtherscanResults((etherscanResults) => [
            ...etherscanResults,
            ...fetchES721Results.result,
          ]);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscan721Response();

      const getEtherscan1155Response = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
          const url = `https://api.etherscan.io/api?module=account&action=token1155tx&address=${walletAddress}&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=${etherscanAPI}`;
          const etherscan1155Response = await fetch(url, {
            method: "GET",
          });
          const fetchES1155Results = await etherscan1155Response.json();
          fetchES1155Results.result.forEach((entry) => {
            entry.type = "1155";
          });
          setEtherscanResults((etherscanResults) => [
            ...etherscanResults,
            ...fetchES1155Results.result,
          ]);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscan1155Response();
    }
  }, [search]);

  /*
  const getValue = async (entry) => {
    try {
      const infuraProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
      const url = `https://mainnet.infura.io/v3/${infuraProjectId}`;
      const ValueResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "eth_getTransactionByHash",
          "params": [`${entry.hash}`],
          "id": 1,
        }),
      });
      const fetchValueResults = await ValueResponse.json();
      return fetchValueResults.result;
    } catch (error) {
      console.error(error);
    }
  };
  */

  //Combine each individual NFT details together if it is sold so there will not be duplicate lines.
  useEffect(() => {
    const tempArray = [];

    const existingEntryChecker = (arr, entry) => {
      const index = arr.findIndex((object) => {
        return (
          JSON.stringify(object.contractAddress) ===
            JSON.stringify(entry.contractAddress) &&
          JSON.stringify(object.tokenID) === JSON.stringify(entry.tokenID)
        );
      });

      if (index != -1) {
        arr[index] = updateEntry(arr, entry, index);
      } else {
        arr.push(addEntry(entry));
      }
    };

    const addEntry = (entry) => {
      let mintChecker = {
        mint: "No",
        mintDate: "",
        mintHash: "",
      };
      let buyChecker = { buy: "No", buyDate: "", buyHash: "" };

      if (entry.from === "0x0000000000000000000000000000000000000000") {
        mintChecker = {
          mint: "Yes",
          mintDate: entry.timeStamp,
          mintHash: entry.hash,
        };
      } else if (
        entry.from !== "0x0000000000000000000000000000000000000000" &&
        entry.to === search.toLowerCase()
      ) {
        buyChecker = {
          buy: "Yes",
          buyDate: entry.timeStamp,
          buyHash: entry.hash,
        };
      }
      return {
        tokenName: entry.tokenName,
        tokenID: entry.tokenID,
        tokenType: entry.type,
        contractAddress: entry.contractAddress,
        minted: mintChecker.mint,
        mintedDate: mintChecker.mintDate,
        mintedHash: mintChecker.mintHash,
        bought: buyChecker.buy,
        boughtDate: buyChecker.buyDate,
        boughtHash: buyChecker.buyHash,
        sold: "No",
        soldDate: "",
        soldHash: "",
      };
    };

    const updateEntry = (arr, entry, index) => {
      const oldEntry = arr[index];
      oldEntry.sold = "Yes";
      oldEntry.soldDate = entry.timeStamp;
      oldEntry.soldHash = entry.hash;
      return oldEntry;
    };

    etherscanResults.forEach((result) => {
      existingEntryChecker(tempArray, result);
    });
    setCollectionList(tempArray);
  }, [search, etherscanResults]);

  const listOfNFT = collectionList.map((esResult) => {
    return (
      <NftBox
        key={`${esResult.tokenName}-${esResult.tokenID}`}
        nftData={esResult}
        totalFP={totalFP}
        setTotalFP={setTotalFP}
      />
    );
  });

  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        direction="column"
        align="center"
        maxW={{
          base: "330px",
          sm: "450px",
          md: "720px",
          lg: "960px",
          xl: "1400px",
        }}
        fontFamily="Open Sans"
      >
        <Heading
          as="h1"
          size={{ base: "sm", md: "md" }}
          m="20px"
          fontFamily="Open Sans"
        >
          NFT Portfolio for {search}
        </Heading>

        <Flex wrap="wrap" justify="center" m="20px" p="10px">
          {listOfNFT}
        </Flex>
      </Flex>
    </AnimatePresence>
  );
}
