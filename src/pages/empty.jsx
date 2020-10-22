import React from "react";
import { HomeLink } from "../components/HomeLink";

export const Empty = () => {
  return (
    <div>
      <HomeLink />
      <div className="content" style={{ fontSize: "xx-large" }}>
        Page not found!
      </div>
    </div>
  );
};
