import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("Renders app", () => {
    const { getByTestId } = render(<App />);
    const linkElement = getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });
});
