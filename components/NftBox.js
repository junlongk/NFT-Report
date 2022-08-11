import React, { useState, useEffect } from "react";
import {
  Center,
  Flex,
  Image,
  Heading,
  Text,
  Tag,
  Badge,
  Stack,
} from "@chakra-ui/react";

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
        h="150px"
        w="150px"
        border="solid 1px"
        rounded="xl"
        boxShadow="lg"
      >
        <Text>Image not found!</Text>
      </Center>
    );
  };

  //Unix timestamp converter
  const unixTimeStampConverter = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000);
    return date.toLocaleDateString("en-US", { dateStyle: "medium" });
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      m="15px"
      h="300px"
      w="240px"
      boxShadow="dark-lg"
      rounded="xl"
      bg="gray.600"
    >
      <a
        href={`https://opensea.io/collection/${osData.collection?.slug}`}
        target="_blank"
        rel="noreferrer"
      >
        <Heading
          as="h2"
          size="sm"
          noOfLines={1}
          mt="10px"
          mx="10px"
          fontFamily="Open Sans"
        >
          {nftData.tokenName}
        </Heading>
      </a>
      <Text fontSize="xs" noOfLines={1} mb="10px" mx="10px">
        {osData.name}
      </Text>
      <Image
        boxSize="150px"
        objectFit="cover"
        src={osData.image_preview_url}
        alt={nftData.tokenName}
        fallback={fallbackElement()}
        rounded="xl"
        boxShadow="lg"
      />
      <Tag size="sm" my="5px">
        Floorprice: {floorPrice} E
      </Tag>
      <Stack align="center">
        {nftData.bought == "Yes" && (
          <Badge colorScheme="blue">
            Bought: {unixTimeStampConverter(nftData.boughtDate)}
          </Badge>
        )}
        {nftData.minted == "Yes" && (
          <Badge colorScheme="green">
            Minted: {unixTimeStampConverter(nftData.mintedDate)}
          </Badge>
        )}
        {nftData.sold == "Yes" && (
          <Badge colorScheme="red">
            Sold: {unixTimeStampConverter(nftData.soldDate)}
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}
