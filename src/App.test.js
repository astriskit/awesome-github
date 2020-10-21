import React from "react";
import { render as r } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const render = (ui, options) => {
  return r(ui, { wrapper: MemoryRouter, ...options });
};

describe("<App />", () => {
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

  it("Click on add to go to github-repo-search page", async () => {
    const { getByTestId } = render(<App />);
    const btn = getByTestId("add-repo");
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    setTimeout(() => {
      expect(window.location.pathname).toEqual("/add-repo");
      expect(getByTestId("app-add-repo")).toBeInTheDocument();
    }, 1000);
  });
});
