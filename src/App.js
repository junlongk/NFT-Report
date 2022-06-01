import React, { useState, useEffect } from "react";

import "./App.css";

import Metamask from "./components/Metamask";
import Searchbar from "./components/Searchbar";
import Usercollection from "./components/Usercollection";

const App = () => {
  const [search, setSearch] = useState("");
  const [etherscanResults, setEtherscanResults] = useState([]);
  const [openseaResults, setOpenseaResults] = useState([]);

  useEffect(() => {
    if (search !== "") {
      const getEtherscanResponse = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = "WMEPDVBFPN3RAGMGFVK8GSPPPD1R1ZKBEU";
          const url =
            "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" +
            walletAddress +
            "&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=" +
            etherscanAPI;
          const etherscanResponse = await fetch(url, {
            method: "GET",
          });
          const fetchESResults = await etherscanResponse.json();
          console.log(etherscanResponse);
          console.log(fetchESResults);
          setEtherscanResults(fetchESResults.result);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscanResponse();
    }
  }, [search]);

  useEffect(() => {
    if (search !== "") {
      const getOpenseaResponse = async () => {
        try {
          const walletAddress = search;
          const url =
            "https://api.opensea.io/api/v1/collections?asset_owner=" +
            walletAddress +
            "&offset=0&limit=300";
          const openseaResponse = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
          });
          const fetchOSResults = await openseaResponse.json();
          console.log(openseaResponse);
          console.log(fetchOSResults);
          setOpenseaResults(fetchOSResults);
        } catch (error) {
          console.error(error);
        }
      };
      getOpenseaResponse();
    }
  }, [search]);

  return (
    <div className="App">
      <div className="NavBar">
        <Searchbar setSearch={setSearch} />
        <Metamask />
      </div>

      <div className="MainPage">
        <Usercollection
          search={search}
          etherscanResults={etherscanResults}
          openseaResults={openseaResults}
        />
      </div>
    </div>
  );
};

export default App;
