import React from "react";
import { render } from "@testing-library/react";
import { Repos } from "./Repos";

describe("<Repos />", () => {
  it("has empty <ul> when no repos is passed", () => {
    const { getByTestId } = render(<Repos />);
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(0);
  });
});
