import React, { useEffect, useState } from "react";

import "./Usercollection.css";

import UsercollectionNFT from "./UsercollectionNFT";

const Usercollection = ({
  search,
  etherscan721Results,
  etherscan1155Results,
  openseaResults,
}) => {
  const [totalFP, setTotalFP] = useState(0);
  const [collectionList, setCollectionList] = useState([]);

  const existingEntryChecker = (arr, entry) => {
    const index = arr.findIndex((object) => {
      return (
        JSON.stringify(object.contractAddress) ===
          JSON.stringify(entry.contractAddress) &&
        JSON.stringify(object.tokenID) === JSON.stringify(entry.tokenID)
      );
    });
    return index;
  };

  const addEntry = (entry, type) => {
    let mintChecker = { mint: "No", mintDate: "", mintHash: "" };
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
      tokenType: type,
      contractAddress: entry.contractAddress,
      minted: mintChecker.mint,
      mintedDate: mintChecker.mintDate,
      mintedHash: mintChecker.mintHash,
      mintedValue: "",
      bought: buyChecker.buy,
      boughtDate: buyChecker.buyDate,
      boughtHash: buyChecker.buyHash,
      boughtValue: "",
      sold: "No",
      soldDate: "",
      soldHash: "",
      soldValue: "",
    };
  };

  const updateEntry = (arr, entry, index) => {
    const oldEntry = arr[index];
    oldEntry.sold = "Yes";
    oldEntry.soldDate = entry.timeStamp;
    oldEntry.soldHash = entry.hash;
    return oldEntry;
  };

  useEffect(() => {
    const temp721Array = [];
    etherscan721Results.map((es721result) => {
      const existingEntryIndex = existingEntryChecker(
        temp721Array,
        es721result
      );
      if (existingEntryIndex !== -1) {
        temp721Array[existingEntryIndex] = updateEntry(
          temp721Array,
          es721result,
          existingEntryIndex
        );
      } else {
        temp721Array.push(addEntry(es721result, "721"));
      }
    });
    setCollectionList((collectionList) => [...collectionList, ...temp721Array]);
  }, [etherscan721Results]);

  useEffect(() => {
    const temp1155Array = [];
    etherscan1155Results.map((es1155result) => {
      const existingEntryIndex = existingEntryChecker(
        temp1155Array,
        es1155result
      );
      if (existingEntryIndex !== -1) {
        temp1155Array[existingEntryIndex] = updateEntry(
          temp1155Array,
          es1155result,
          existingEntryIndex
        );
      } else {
        temp1155Array.push(addEntry(es1155result, "1155"));
      }
    });
    setCollectionList((collectionList) => [
      ...collectionList,
      ...temp1155Array,
    ]);
  }, [etherscan1155Results]);

  console.log(collectionList);

  const listOfNFT = openseaResults.map((osResult) => {
    return (
      <UsercollectionNFT
        key={osResult.slug}
        name={osResult.name}
        slug={osResult.slug}
        imageUrl={osResult.image_url}
        totalFP={totalFP}
        setTotalFP={setTotalFP}
      />
    );
  });

  return (
    <div className="UserCollection">
      <fieldset>
        <legend>NFT Portfolio for {search}</legend>

        <div className="UserPortfolio">
          <h2>Current Profile Value: {totalFP} ETH</h2>
        </div>

        <div className="UserNFTCollection">Placeholder!</div>
      </fieldset>
    </div>
  );
};

export default Usercollection;
