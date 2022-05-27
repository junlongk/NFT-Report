import React, { useState } from "react";
import "./Mycollection.css";
import MycollectionNFT from "./MycollectionNFT";

const Mycollection = ({ results }) => {
  const [totalFP, setTotalFP] = useState(0);
  const listOfNFT = Object.keys(results).map((result, index) => {
    return (
      <MycollectionNFT
        key={results[index].slug}
        name={results[index].name}
        slug={results[index].slug}
        imageUrl={results[index].image_url}
        setTotalFP={setTotalFP}
      />
    );
  });
  return (
    <div className="MyCollection">
      <h1>Current PortFolio: {totalFP} ETH</h1>
      {listOfNFT}
    </div>
  );
};

export default Mycollection;
