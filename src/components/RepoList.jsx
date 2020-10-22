import React from "react";
import { useRepos } from "../utils/useRepos";
import { Repos as List } from "./Repos";
import "./RepoList.css";

const Loader = () => (
  <div data-testid="loader" className="loader">
    Loading...
  </div>
);

const NoRepos = () => <div className="no-repos">No repositories found</div>;

export const RepoList = () => {
  const { loading, data: { repos = [] } = {} } = useRepos();
  return (
    <div data-testid="repo-list-container" className="repo-list-container">
      {loading ? (
        <Loader />
      ) : repos.length ? (
        <List repos={repos} />
      ) : (
        <NoRepos />
      )}
    </div>
  );
};
