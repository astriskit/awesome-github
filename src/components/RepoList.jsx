import React, { useContext } from "react";
import { StoreContext } from "../utils/store-context";
import { Repos as List } from "./Repos";
import { NoRepos } from "./NoRepos";
import { AddRemoveIterator } from "./AddRemoveIterator";
import "./RepoList.css";

export const RepoList = () => {
  const { items: repos, removeItem, hasItem } = useContext(StoreContext);

  return (
    <div data-testid="repo-list-container" className="repo-list-container">
      {repos.length ? (
        <List
          repos={repos}
          iteratorProps={{ onRemove: removeItem, isAdded: hasItem }}
          iterator={AddRemoveIterator}
        />
      ) : (
        <NoRepos />
      )}
    </div>
  );
};
