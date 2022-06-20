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
        Object.assign(entry, { value: `${fetchValueResults.result.value}` });
      } catch (error) {
        console.error(error);
      }
    };

    if (search !== "") {
      const getEtherscan721Response = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;
          const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${walletAddress}&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=${etherscanAPI}`;
          const etherscan721Response = await fetch(url, {
            method: "GET",
          });
          const fetchES721Results = await etherscan721Response.json();
          fetchES721Results.result.forEach((entry) => {
            getValue(entry);
            entry.type = "721";
          });
          console.log(etherscan721Response, fetchES721Results.result);
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
          const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;
          const url = `https://api.etherscan.io/api?module=account&action=token1155tx&address=${walletAddress}&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=${etherscanAPI}`;
          const etherscan1155Response = await fetch(url, {
            method: "GET",
          });
          const fetchES1155Results = await etherscan1155Response.json();
          fetchES1155Results.result.forEach((entry) => {
            getValue(entry);
            entry.type = "1155";
          });
          console.log(etherscan1155Response, fetchES1155Results.result);
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
  */

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
