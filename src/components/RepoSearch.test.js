import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RepoSearch } from "./RepoSearch";

describe("<RepoSearch />", () => {
  it("shows loading", () => {
    const { getByTestId } = render(<RepoSearch loading={true} />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("call onFind with query and radio-state", () => {
    const query = "react";
    const handleFind = jest.fn();
    const { getByTestId } = render(<RepoSearch onFind={handleFind} />);
    const search = getByTestId("search-repo");
    fireEvent.change(search, { target: { value: query } });
    const byUser = getByTestId("search-by-user");
    fireEvent.click(byUser);
    const btn = getByTestId("btn-search");
    fireEvent.click(btn);
    expect(handleFind).toHaveBeenCalledWith("by-user", query);
    const byRepo = getByTestId("search-by-repo");
    fireEvent.click(byRepo);
    fireEvent.click(btn);
    expect(handleFind).toHaveBeenCalledWith("by-repo", query);
  });

  it("shows error when nothing is typed in", () => {
    const handleFind = jest.fn();
    const origAlert = window.alert;
    Object.defineProperty(window, "alert", {
      value: jest.fn(),
      writable: true,
    });
    const { getByTestId } = render(<RepoSearch onFind={handleFind} />);
    const btn = getByTestId("btn-search");
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("Nothing to find!");
    window.alert = origAlert;
  });
});
