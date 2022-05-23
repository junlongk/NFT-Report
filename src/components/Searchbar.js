import React, { useState } from "react";
import "./Searchbar.css";

const Searchbar = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(query);
    setQuery("");
    event.preventDefault();
  };

  return (
    <div>
      <form className="SearchBar" onSubmit={(event) => handleSearch(event)}>
        <input
          className="SearchInput"
          value={query}
          onChange={(event) => handleQuery(event)}
        />
        <button className="SearchButton" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
