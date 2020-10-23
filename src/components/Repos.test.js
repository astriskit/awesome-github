import React from "react";
import { render } from "@testing-library/react";
import { repos } from "../mock-utils/repos";
import { Repos } from "./Repos";

describe("<Repos />", () => {
  it("has empty <ul> when no repos is passed", () => {
    const { getByTestId } = render(<Repos />);
    const ul = getByTestId("repos-list");
    expect(ul.childElementCount).toEqual(0);
  });

  it("uses iterator function when passed", () => {
    const nit = ({ href, cls }) => <span className={cls}>{href}</span>;
    const cls = "test-class";
    const { getByText } = render(
      <Repos repos={repos} iterator={nit} iteratorProps={{ cls }} />
    );
    for (const repo of repos) {
      const line = getByText(repo.href);
      expect(line).toBeInTheDocument();
      expect(line.getAttribute("class")).toEqual(cls);
    }
  });

  it("works fine without iterator", () => {
    const { getByText } = render(<Repos repos={repos} />);
    expect(getByText(repos[0].name)).toBeInTheDocument();
  });
});
