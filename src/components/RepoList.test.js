import React from "react";
import { RepoList } from "./RepoList";
import { render } from "@testing-library/react";
import { useRepos } from "../utils/useRepos";
jest.mock("../utils/useRepos");

describe("<RepoList />", () => {
  it("shows loading", () => {
    useRepos.mockReturnValue({
      loading: true,
    });
    const { getByTestId } = render(<RepoList />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("shows no repos added when no repos are there", () => {
    useRepos.mockReturnValue({
      loading: false,
      data: {
        repos: [],
      },
    });
    const { getByText } = render(<RepoList />);
    expect(getByText(/no repositories found/i)).toBeInTheDocument();
  });

  it("shows found repos", () => {
    const testRepo = {
      href: "github/uname/test-href.git",
      name: "test-href",
      title: "optional title",
    };
    const testRepoWithoutName = {
      href: "github/uname/test-href-2.git",
      title: "optional title-2",
    };
    useRepos.mockReturnValue({
      loading: false,
      data: {
        repos: [testRepo, testRepoWithoutName],
      },
    });
    const { getByText } = render(<RepoList />);
    const item = getByText(testRepo.name);
    expect(item.getAttribute("title")).toEqual(testRepo.title);
    expect(item.getAttribute("href")).toEqual(testRepo.href);
    expect(getByText(testRepoWithoutName.title)).toBeInTheDocument();
  });
});
