import React from "react";
import "./RepoSearch.css";

export const RepoSearch = () => (
  <div className="flex column center search-repo-container">
    <input type="text" placeholder="Type to search" data-testid="search-repo" />
    <div>
      <label>
        <input
          type="radio"
          name="search-by"
          value="repo"
          data-testid="search-by-repo"
        />
        Repo-name
      </label>
      <label>
        <input
          type="radio"
          name="search-by"
          value="user"
          data-testid="search-by-user"
        />
        Username
      </label>
    </div>
    <button data-testid="btn-search">Find</button>
  </div>
);
