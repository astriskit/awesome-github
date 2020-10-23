import React, { useContext } from "react";
import { HomeLink } from "../components/HomeLink";
import { RepoSearch } from "../components/RepoSearch";
import { NoRepos } from "../components/NoRepos";
import { Repos } from "../components/Repos";
import { Error } from "../components/Error";
import { useSearch } from "../utils/useSearch";
import { StoreContext } from "../utils/store-context";

const addIterator = ({ name, href, onAdd, isAdded }) => {
  const handleAdd = () => {
    onAdd({ name, href, title: name });
  };
  return (
    <div className="flex center" style={{ justifyContent: "space-between" }}>
      <div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "x-large" }}
        >
          {name}
        </a>
      </div>
      {!isAdded(href) && (
        <div>
          <button onClick={handleAdd}>+</button>
        </div>
      )}
    </div>
  );
};

export const AddRepo = () => {
  const { loading, handleSearch, data, error } = useSearch();
  const { addItem, items } = useContext(StoreContext);
  const onAdd = (item) => addItem(item);
  const isAdded = (href) => !!items.find(({ href: h }) => h === href);
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
              iterator={addIterator}
              iteratorProps={{ onAdd, isAdded }}
            />
          ) : (
            <NoRepos />
          )}
        </div>
      )}
    </div>
  );
};
