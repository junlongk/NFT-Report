import React, { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(query);
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
