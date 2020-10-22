import React from "react";
import { RepoList } from "./RepoList";
import { render as r } from "@testing-library/react";
import { testRepoWithoutName, testRepo } from "../mock-utils/repos";
import { StoreContext } from "../utils/store-context";

const render = (ui, { store, ...options }) => {
  const MUI = <StoreContext.Provider value={store} children={ui} />;
  return r(MUI, options);
};

describe("<RepoList />", () => {
  it("shows no repos added when no repos are there", () => {
    const { getByText } = render(<RepoList />, { store: { items: [] } });
    expect(getByText(/no repositories found/i)).toBeInTheDocument();
  });

  it("shows found repos", () => {
    const { getByText } = render(<RepoList />, {
      store: { items: [testRepo, testRepoWithoutName] },
    });
    const item = getByText(testRepo.name);
    expect(item.getAttribute("title")).toEqual(testRepo.title);
    expect(item.getAttribute("href")).toEqual(testRepo.href);
    expect(getByText(testRepoWithoutName.title)).toBeInTheDocument();
  });
});
