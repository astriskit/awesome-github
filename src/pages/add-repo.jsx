import React, { useContext } from "react";
import { HomeLink } from "../components/HomeLink";
import { RepoSearch } from "../components/RepoSearch";
import { NoRepos } from "../components/NoRepos";
import { Repos } from "../components/Repos";
import { Error } from "../components/Error";
import { AddRemoveIterator as Iterator } from "../components/AddRemoveIterator";
import { useSearch } from "../utils/useSearch";
import { StoreContext } from "../utils/store-context";

export const AddRepo = () => {
  const { loading, handleSearch, data, error } = useSearch();
  const { addItem, removeItem, hasItem } = useContext(StoreContext);
  const onAdd = (item) => addItem(item);
  return (
    <div data-testid="app-add-repo" className="add-repo">
      <HomeLink />
      <RepoSearch onFind={handleSearch} loading={loading} />
      {!loading && (
        <div className="flex center">
          {error ? (
            <Error message={error} />
          ) : data.length ? (
            <Repos
              repos={data}
              iterator={Iterator}
              iteratorProps={{ onAdd, isAdded: hasItem, onRemove: removeItem }}
            />
          ) : (
            <NoRepos />
          )}
        </div>
      )}
    </div>
  );
};
