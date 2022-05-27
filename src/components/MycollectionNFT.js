import React, { useState, useEffect } from "react";
import "./MycollectionNFT.css";

const MycollectionNFT = ({ name, slug, imageUrl, setTotalFP }) => {
  const [floorPrice, setFloorPrice] = useState(0);

  const addSlugToStatsUrl = (slug) => {
    return "https://api.opensea.io/api/v1/collection/" + slug + "/stats";
  };
  const statsUrl = addSlugToStatsUrl(slug);

  const addSlugToCollectionUrl = (slug) => {
    return "https://opensea.io/collection/" + slug;
  };
  const collectionUrl = addSlugToCollectionUrl(slug);

  useEffect(() => {
    const getFloorPrice = async () => {
      try {
        const response = await fetch(statsUrl, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const responseData = await response.json();
        setFloorPrice(responseData.stats.floor_price);
      } catch (error) {
        console.error(error);
      }
    };
    getFloorPrice();
  }, [statsUrl]);

  return (
    <div className="IndividualNFTWindow">
      <a href={collectionUrl} target="_blank" rel="noreferrer">
        <h2>{name}</h2>
      </a>
      <img src={imageUrl} alt={name} />
      <p>FP: {floorPrice}</p>
    </div>
  );
};

export default MycollectionNFT;
