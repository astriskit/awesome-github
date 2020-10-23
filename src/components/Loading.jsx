import React from "react";
import Spinner from "../assets/spinner.gif";

export const Loading = () => (
  <div data-testid="loader">
    <img alt="Loading" src={Spinner} />
  </div>
);
