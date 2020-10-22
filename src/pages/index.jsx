import React from "react";
import { Link } from "react-router-dom";
import { RepoList } from "../components/RepoList";

export const Index = () => {
  return (
    <div data-testid="app-home">
      <Link data-testid="add-repo" to="/add-repo" className="link">
        + Add
      </Link>
      <RepoList />
    </div>
  );
};
