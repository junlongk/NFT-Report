import React, { useState } from "react";

import "./Usercollection.css";

import UsercollectionNFT from "./UsercollectionNFT";

const Usercollection = ({ search, etherscanResults, openseaResults }) => {
  const [totalFP, setTotalFP] = useState(0);

  const listOfNFT = openseaResults.map((result, index) => {
    return (
      <UsercollectionNFT
        key={openseaResults[index].slug}
        name={openseaResults[index].name}
        slug={openseaResults[index].slug}
        imageUrl={openseaResults[index].image_url}
        totalFP={totalFP}
        setTotalFP={setTotalFP}
      />
    );
  });

  const listofESNFT = etherscanResults.map((entry, index) => {
    return (
      <li key={index}>
        {entry.tokenName}, {entry.tokenID}, {entry.blockNumber}
      </li>
    );
  });

  return (
    <div className="UserCollection">
      <div>
        <ul>{listofESNFT}</ul>
      </div>
      <div className="UserPortfolio">
        <h2>Current PortFolio for {search}</h2>
        <h2>{totalFP} ETH</h2>
      </div>

      <div className="UserNFTCollection">{listOfNFT}</div>
    </div>
  );
};

export default Usercollection;
