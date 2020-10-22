import React from "react";
import { render as r, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { repos } from "./mock-utils/repos";
import { logger } from "./utils/logger";
import App from "./App";
import { ghSearchUrl } from "./utils/constants";

jest.mock("./utils/logger");
jest.mock("axios");

const render = (Ui, { route = "/", ...options } = {}) => {
  return r(
    <MemoryRouter initialEntries={[route]} initialIndex={0} children={Ui} />,
    options
  );
};

const expectEleType = (ele, type) => {
  expect(ele.tagName.toLowerCase()).toEqual(type);
};

const expectInput = (ele) => {
  expect(ele).toBeInTheDocument();
  expectEleType(ele, "input");
};

const expectButton = (ele) => {
  expect(ele).toBeInTheDocument();
  expectEleType(ele, "button");
};

const expectRadio = (ele) => {
  expectInput(ele);
  expect(ele.getAttribute("type")).toEqual("radio");
};

const opts = {
  headers: { Accept: "application/vnd.github.v3+json" },
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

  it("Renders app without crashing", () => {
    const { getByTestId } = render(<App />);
    const linkElement = getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });

  it("App has header - Github Bookmark Manager", () => {
    const { getByText } = render(<App />);
    expect(getByText(/github bookmark manager/i)).toBeInTheDocument();
  });

  it("Lands on home-page (/)", () => {
    const { getByTestId } = render(<App />);
    expect(window.location.pathname).toEqual("/");
    expect(getByTestId("app-home")).toBeInTheDocument();
  });

  it(" / : Add button to point to /add-repo page", () => {
    const { getByTestId } = render(<App />);
    const btn = getByTestId("add-repo");
    expect(btn).toBeInTheDocument();
    expect(btn.href).toEqual(expect.stringMatching(/add-repo$/));
  });

  it(" / : List-container for the added repositories exist", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("repo-list-container")).toBeInTheDocument();
  });

  it(" / : shows list items from props", () => {
    const { getByTestId, getByText } = render(<App initial={repos} />);
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(repos.length);
    expect(getByText(repos[0].name)).toBeInTheDocument();
  });

  it(" / : shows list items from storage", () => {
    localStorage.getItem = jest.fn(() => JSON.stringify(repos));
    const { getByTestId, getByText } = render(<App />);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("bookmarks");
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(repos.length);
    expect(getByText(repos[0].name)).toBeInTheDocument();
  });

  it(" / : invalid items in storage", () => {
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

  it(" /add-repo : Page exists for searching repos by username or repo-name", () => {
    const { getByTestId } = render(<App />, { route: "/add-repo" });
    expect(getByTestId("app-add-repo")).toBeInTheDocument();
    const search = getByTestId("search-repo");
    expectInput(search);
    const inByUser = getByTestId("search-by-user");
    expectRadio(inByUser);
    const inByRepo = getByTestId("search-by-repo");
    expectRadio(inByRepo);
    const btn = getByTestId("btn-search");
    expectButton(btn);
  });

  it(" /add-repo : finds repo by repo-name and user-name", async () => {
    const query = "react-mobx";
    render(<App />, { route: "/add-repo" });
    const search = screen.getByTestId("search-repo");
    userEvent.type(search, query);
    expect(search.value).toEqual(query);
    const btn = screen.getByTestId("btn-search");
    axios.get = jest.fn().mockResolvedValue({
      data: {
        items: repos.map(({ name, href }) => ({ html_url: href, name })),
      },
    });
    userEvent.click(btn);
    const list = await screen.findByTestId("repos-list");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${ghSearchUrl}?q=${query}+is:public`,
      opts
    );
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toEqual(repos.length);
  });

  it(" /add-repo : finds repo by repo-name", async () => {
    render(<App />, { route: "/add-repo" });
    const search = screen.getByTestId("search-repo");
    const userQuery = "astriskit";
    userEvent.type(search, userQuery);
    expect(search.value).toEqual(userQuery);
    const byUser = screen.getByTestId("search-by-user");
    userEvent.click(byUser);
    const btn = screen.getByTestId("btn-search");
    axios.get = jest.fn().mockResolvedValue({
      data: {
        items: repos.map(({ name, href }) => ({ html_url: href, name })),
      },
    });
    userEvent.click(btn);
    const list = await screen.findByTestId("repos-list");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${ghSearchUrl}?q=user:${userQuery}+is:public`,
      opts
    );
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toEqual(repos.length);
  });

  it(" /add-repo : shows not found", async () => {
    render(<App />, { route: "/add-repo" });
    const query = "xyz";
    const search = screen.getByTestId("search-repo");
    userEvent.type(search, query);
    const btn = screen.getByTestId("btn-search");
    axios.get = jest.fn().mockResolvedValue({
      data: {
        items: [],
      },
    });
    userEvent.click(btn);
    const nf = await screen.findByText(/no repositories found/i);
    expect(nf).toBeInTheDocument();
  });

  it(" /add-repo : shows error", async () => {
    render(<App />, { route: "/add-repo" });
    const query = "xyz";
    const search = screen.getByTestId("search-repo");
    userEvent.type(search, query);
    const btn = screen.getByTestId("btn-search");
    axios.get = jest.fn(() => Promise.reject(new Error("test-error!!")));
    userEvent.click(btn);
    const nf = await screen.findByText(/error: "test-error!!"/i);
    expect(nf).toBeInTheDocument();
  });

  it(" /bad-page : lands on 404", () => {
    const { getByText } = render(<App />, { route: "/bad-page" });
    expect(getByText(/page not found/i)).toBeInTheDocument();
  });
});
