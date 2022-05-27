import React, { useState, useEffect } from "react";
import "./App.css";
import Metamask from "./components/Metamask";
import Searchbar from "./components/Searchbar";
import Mycollection from "./components/Mycollection";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
    const getResponse = async () => {
      try {
        const url =
          "https://api.opensea.io/api/v1/collections?asset_owner=0x29d21aeA65df8a6f76d464559698DBB2F89F7992&offset=0&limit=300";
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const fetchResults = await response.json();
        console.log(response);
        console.log(fetchResults);
        setResults(fetchResults);
      } catch (error) {
        console.error(error);
      }
    };
    getResponse();
  }, []);

  return (
    <div className="App">
      <div className="NavBar">
        <Searchbar setSearch={setSearch} />
        <Metamask />
      </div>
      <Mycollection results={results} />
    </div>
  );
};

export default App;
