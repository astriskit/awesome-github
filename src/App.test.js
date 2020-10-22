import React from "react";
import { render as r } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { repos } from "./mock-utils/repos";
import { logger } from "./utils/logger";
import App from "./App";

jest.mock("./utils/logger");

const render = (Ui, { route = "/", ...options } = {}) => {
  return r(
    <MemoryRouter initialEntries={[route]} initialIndex={0} children={Ui} />,
    options
  );
};

describe("<App />", () => {
  const origLS = localStorage;

  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  afterEach(() => {
    localStorage = origLS;
    localStorage.clear();
  });

  it("Renders app", () => {
    const { getByTestId } = render(<App />);
    const linkElement = getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });

  it("has header - Github Bookmark Manager", () => {
    const { getByText } = render(<App />);
    expect(getByText(/github bookmark manager/i)).toBeInTheDocument();
  });

  it("Lands on home-page", () => {
    const { getByTestId } = render(<App />);
    expect(window.location.pathname).toEqual("/");
    expect(getByTestId("app-home")).toBeInTheDocument();
  });

  it("Home: Add button to point to /add-repo page", () => {
    const { getByTestId } = render(<App />);
    const btn = getByTestId("add-repo");
    expect(btn).toBeInTheDocument();
    expect(btn.href).toEqual(expect.stringMatching(/add-repo$/));
  });

  it("Home: List-container for the added repositories exist", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("repo-list-container")).toBeInTheDocument();
  });

  it("Home: shows list items from props", () => {
    const { getByTestId, getByText } = render(<App initial={repos} />);
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(repos.length);
    expect(getByText(repos[0].name)).toBeInTheDocument();
  });

  it("Home: shows list items from storage", () => {
    localStorage.getItem = jest.fn(() => JSON.stringify(repos));
    const { getByTestId, getByText } = render(<App />);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("bookmarks");
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(repos.length);
    expect(getByText(repos[0].name)).toBeInTheDocument();
  });

  it("Home: invalid items in storage", () => {
    localStorage.getItem = jest.fn(() => "hello world");
    localStorage.removeItem = jest.fn();
    logger.error = jest.fn();
    const { getByText } = render(<App />);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("bookmarks");
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith("bookmarks");
    expect(getByText(/no repositories found/i)).toBeInTheDocument();
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it("Add-repo: Page exists", () => {
    const { getByTestId } = render(<App />, { route: "/add-repo" });
    expect(getByTestId("app-add-repo")).toBeInTheDocument();
  });

  it("/bad-page lands on 404", () => {
    const { getByText } = render(<App />, { route: "/bad-page" });
    expect(getByText(/page not found/i)).toBeInTheDocument();
  });
});
