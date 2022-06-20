import React, { useEffect, useState } from "react";

import "./Usercollection.css";
import UsercollectionNFT from "./UsercollectionNFT";

const Usercollection = ({ search, etherscanResults, openseaResults }) => {
  const [totalFP, setTotalFP] = useState(0);
  const [collectionList, setCollectionList] = useState([]);

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

      if (index !== -1) {
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
        mintValue: "",
      };
      let buyChecker = { buy: "No", buyDate: "", buyHash: "", buyValue: "" };

      if (entry.from === "0x0000000000000000000000000000000000000000") {
        mintChecker = {
          mint: "Yes",
          mintDate: entry.timeStamp,
          mintHash: entry.hash,
          mintValue: entry.value,
        };
      } else if (
        entry.from !== "0x0000000000000000000000000000000000000000" &&
        entry.to === search.toLowerCase()
      ) {
        buyChecker = {
          buy: "Yes",
          buyDate: entry.timeStamp,
          buyHash: entry.hash,
          buyValue: entry.value,
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
        mintedValue: mintChecker.mintValue,
        bought: buyChecker.buy,
        boughtDate: buyChecker.buyDate,
        boughtHash: buyChecker.buyHash,
        boughtValue: buyChecker.buyValue,
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
      oldEntry.soldValue = entry.value;
      return oldEntry;
    };

    etherscanResults.forEach((result) => {
      existingEntryChecker(tempArray, result);
    });
    setCollectionList(tempArray);
  }, [etherscanResults]);

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

        <div className="UserNFTCollection">
          {collectionList.map((collection) => {
            return <pre>{JSON.stringify(collection)}</pre>;
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default Usercollection;
