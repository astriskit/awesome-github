import React, { useContext } from "react";
import { StoreContext } from "../utils/store-context";
import { Repos as List } from "./Repos";
import "./RepoList.css";

const NoRepos = () => <div className="no-repos">No repositories found</div>;

export const RepoList = () => {
  const { items: repos } = useContext(StoreContext);
  return (
    <div data-testid="repo-list-container" className="repo-list-container">
      {repos.length ? <List repos={repos} /> : <NoRepos />}
    </div>
  );
};
