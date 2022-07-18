import React, { useState, useEffect } from "react";
import { Center, Flex, Image, Heading, Text, Badge } from "@chakra-ui/react";

export default function NftBox({ nftData, totalFP, setTotalFP }) {
  const [floorPrice, setFloorPrice] = useState(0);
  const [osData, setOSData] = useState({});

  //Get Opensea data of each NFT
  useEffect(() => {
    const getOSData = async () => {
      try {
        const osUrl = `https://api.opensea.io/api/v1/asset/${nftData.contractAddress}/${nftData.tokenID}/?include_orders=false`;
        const osResponse = await fetch(osUrl, {
          method: "GET",
        });
        const osResponseData = await osResponse.json();
        setOSData(osResponseData);
      } catch (error) {
        console.error(error);
      }
    };
    getOSData();
  }, [nftData]);

  //Get floor price of each NFT
  useEffect(() => {
    const getFloorPrice = async () => {
      try {
        const statsUrl = `https://api.opensea.io/api/v1/collection/${osData.collection.slug}/stats`;
        const response = await fetch(statsUrl, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const responseData = await response.json();
        setFloorPrice(responseData.stats.floor_price);
        setTotalFP((totalFP) => totalFP + floorPrice);
      } catch (error) {
        console.error(error);
      }
    };
    getFloorPrice();
  }, [osData, floorPrice, setTotalFP]);

  //Fallback element for NFT image
  const fallbackElement = () => {
    return (
      <Center
        h="180px"
        w="180px"
        border="solid 1px"
        rounded="xl"
        boxShadow="lg"
      >
        <Text>Image not found!</Text>
      </Center>
    );
  };

  //NFT status based on nftData - eg. bought, minted, sold
  const NFTstatus = () => {
    return <Text>Hi</Text>;
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      m="10px"
      h="300px"
      w="240px"
      boxShadow="lg"
      rounded="xl"
      bg="gray.600"
    >
      <a href="" target="_blank" rel="noreferrer">
        <Heading as="h2" size="sm" noOfLines={1} my="10px">
          {nftData.tokenName}
        </Heading>
      </a>
      <Image
        boxSize="180px"
        objectFit="cover"
        src={osData.image_preview_url}
        alt={nftData.tokenName}
        fallback={fallbackElement()}
        rounded="xl"
        boxShadow="lg"
      />
      <Text fontSize="xs" my="5px">
        FP: {floorPrice} ETH
      </Text>
    </Flex>
  );
}
