import React, { useState } from "react";

import "./Usercollection.css";

import UsercollectionNFT from "./UsercollectionNFT";

const Usercollection = ({
  search,
  etherscanNormalResults,
  etherscan721Results,
  etherscan1155Results,
  openseaResults,
}) => {
  const [totalFP, setTotalFP] = useState(0);

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

  const listof721ESNFT = etherscan721Results.map((es721Result, index) => {
    if (es721Result.from === "0x0000000000000000000000000000000000000000") {
      return (
        <p key={index}>
          {es721Result.tokenName} #{es721Result.tokenID} minted!
        </p>
      );
    } else if (es721Result.to === search.toLowerCase()) {
      return (
        <p key={index}>
          {es721Result.tokenName} #{es721Result.tokenID} bought!
        </p>
      );
    } else if (es721Result.from === search.toLowerCase()) {
      return (
        <p key={index}>
          {es721Result.tokenName} #{es721Result.tokenID} sold!
        </p>
      );
    }
  });

  const listof1155ESNFT = etherscan1155Results.map((es1155Result, index) => {
    if (es1155Result.from === "0x0000000000000000000000000000000000000000") {
      return (
        <p key={index}>
          {es1155Result.tokenName} #{es1155Result.tokenID} minted!
        </p>
      );
    } else if (es1155Result.to === search.toLowerCase()) {
      return (
        <p key={index}>
          {es1155Result.tokenName} #{es1155Result.tokenID} bought!
        </p>
      );
    } else if (es1155Result.from === search.toLowerCase()) {
      return (
        <p key={index}>
          {es1155Result.tokenName} #{es1155Result.tokenID} sold!
        </p>
      );
    }
  });

  return (
    <div className="UserCollection">
      <fieldset>
        <legend>NFT Portfolio for {search}</legend>

        <div className="UserPortfolio">
          <h2>Current Profile Value: {totalFP} ETH</h2>
        </div>

        <div>
          <h2>List of Etherscan 721 Tokens results</h2>
          {listof721ESNFT}
          <h2>List of Etherscan 1155 Tokens results</h2>
          {listof1155ESNFT}
        </div>

        <div className="UserNFTCollection">{listOfNFT}</div>
      </fieldset>
    </div>
  );
};

export default Usercollection;
