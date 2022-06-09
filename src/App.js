import React, { useState, useEffect } from "react";

import "./App.css";

import Metamask from "./components/Metamask";
import Searchbar from "./components/Searchbar";
import Usercollection from "./components/Usercollection";

const App = () => {
  const [search, setSearch] = useState("");
  const [etherscanNormalResults, setEtherscanNormalResults] = useState([]);
  const [etherscan721Results, setEtherscan721Results] = useState([]);
  const [etherscan1155Results, setEtherscan1155Results] = useState([]);
  const [openseaResults, setOpenseaResults] = useState([]);

  useEffect(() => {
    if (search !== "") {
      const getTestResponse = async () => {
        try {
          const infuraProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
          const url = "https://mainnet.infura.io/v3/" + infuraProjectId;
          const testResponse = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "jsonrpc": "2.0",
              "method": "eth_getTransactionByHash",
              "params": [
                "0x8eba45d95d6644103b96b871dde62b4e6e588730dbbc7efa136acf30c508f677",
              ],
              "id": 1,
            }),
          });
          const fetchTestResults = await testResponse.json();
          console.log(testResponse);
          console.log(fetchTestResults);
        } catch (error) {
          console.error(error);
        }
      };
      getTestResponse();
    }
  }, [search]);

  useEffect(() => {
    if (search !== "") {
      const getEtherscanNormalResponse = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;
          const url =
            "https://api.etherscan.io/api?module=account&action=txlist&address=" +
            walletAddress +
            "&startblock=0&endblock=999999999&sort=asc&apikey=" +
            etherscanAPI;
          const etherscanNormalResponse = await fetch(url, {
            method: "GET",
          });
          const fetchESNormalResults = await etherscanNormalResponse.json();
          console.log(etherscanNormalResponse);
          console.log(fetchESNormalResults);
          setEtherscanNormalResults(fetchESNormalResults.result);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscanNormalResponse();
    }
  }, [search]);

  useEffect(() => {
    if (search !== "") {
      const getEtherscan721Response = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;
          const url =
            "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" +
            walletAddress +
            "&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=" +
            etherscanAPI;
          const etherscan721Response = await fetch(url, {
            method: "GET",
          });
          const fetchES721Results = await etherscan721Response.json();
          console.log(etherscan721Response);
          console.log(fetchES721Results);
          setEtherscan721Results(fetchES721Results.result);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscan721Response();
    }
  }, [search]);

  useEffect(() => {
    if (search !== "") {
      const getEtherscan1155Response = async () => {
        try {
          const walletAddress = search;
          const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;
          const url =
            "https://api.etherscan.io/api?module=account&action=token1155tx&address=" +
            walletAddress +
            "&page=1&offset=100&startblock=0&endblock=999999999&sort=asc&apikey=" +
            etherscanAPI;
          const etherscan1155Response = await fetch(url, {
            method: "GET",
          });
          const fetchES1155Results = await etherscan1155Response.json();
          console.log(etherscan1155Response);
          console.log(fetchES1155Results);
          setEtherscan1155Results(fetchES1155Results.result);
        } catch (error) {
          console.error(error);
        }
      };
      getEtherscan1155Response();
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
          etherscanNormalResults={etherscanNormalResults}
          etherscan721Results={etherscan721Results}
          etherscan1155Results={etherscan1155Results}
          openseaResults={openseaResults}
        />
      </div>
    </div>
  );
};

export default App;
