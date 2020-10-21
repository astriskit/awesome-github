import React from "react";
import { render as r } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const render = (Ui, { route = "/", ...options } = {}) => {
  return r(
    <MemoryRouter
      initialEntries={[route]}
      initialIndex={0}
      children={Ui}
    ></MemoryRouter>,
    options
  );
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

  it("Home: Add button to point to /add-repo page", () => {
    const { getByTestId } = render(<App />);
    const btn = getByTestId("add-repo");
    expect(btn).toBeInTheDocument();
    expect(btn.href).toEqual(expect.stringMatching(/add-repo$/));
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
