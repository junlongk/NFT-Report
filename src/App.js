import React from "react";
import "./App.css";
import Metamask from "./components/Metamask";
import Searchbar from "./components/Searchbar";

const App = () => {
  return (
    <div className="App">
      <div className="NavBar">
        <Searchbar />
        <Metamask />
      </div>
    </div>
  );
};

export default App;
