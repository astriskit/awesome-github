import React from "react";
import { HomeLink } from "../components/HomeLink";
import { RepoSearch } from "../components/RepoSearch";

export const AddRepo = () => (
  <div data-testid="app-add-repo">
    <HomeLink />
    <RepoSearch />
  </div>
);
