import React, { useState } from "react";
import { Loading } from "./Loading";
import "./RepoSearch.css";

export const RepoSearch = ({ onFind = () => {}, loading = false }) => {
  const [query, setQuery] = useState("");
  const [searchOp, setSearchOp] = useState("by-repo");

  const handleQuery = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSearchOpt = ({ target: { value } }) => {
    setSearchOp(value);
  };

  const handleSearch = () => {
    if (query && searchOp) {
      onFind(searchOp, query);
    } else {
      window.alert("Nothing to find!");
    }
  };
  return (
    <div className="flex column center search-repo-container">
      <input
        type="text"
        placeholder="Type to search"
        data-testid="search-repo"
        value={query}
        onChange={handleQuery}
      />
      <div>
        <label>
          <input
            type="radio"
            name="search-by"
            value="by-repo"
            data-testid="search-by-repo"
            onChange={handleSearchOpt}
            checked={searchOp === "by-repo" ? true : false}
          />
          Repo-name
        </label>
        <label>
          <input
            type="radio"
            name="search-by"
            value="by-user"
            data-testid="search-by-user"
            onChange={handleSearchOpt}
            checked={searchOp === "by-user" ? true : false}
          />
          Username
        </label>
      </div>
      <button
        data-testid="btn-search"
        disabled={loading}
        onClick={handleSearch}
      >
        Find
      </button>
      {loading && <Loading />}
    </div>
  );
};
