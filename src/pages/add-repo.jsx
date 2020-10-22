import React from "react";
import { HomeLink } from "../components/HomeLink";
import { RepoSearch } from "../components/RepoSearch";
import { NoRepos } from "../components/NoRepos";
import { Repos } from "../components/Repos";
import { Error } from "../components/Error";
import { useSearch } from "../utils/useSearch";

export const AddRepo = () => {
  const { loading, handleSearch, data, error } = useSearch();
  return (
    <div data-testid="app-add-repo" className="add-repo">
      <HomeLink />
      <RepoSearch onFind={handleSearch} loading={loading} />
      {!loading && (
        <div className="flex center">
          {error ? (
            <Error message={error} />
          ) : data.length ? (
            <Repos repos={data} />
          ) : (
            <NoRepos />
          )}
        </div>
      )}
    </div>
  );
};
