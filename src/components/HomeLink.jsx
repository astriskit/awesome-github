import React from "react";
import { Link } from "react-router-dom";

export const HomeLink = () => (
  <Link data-testid="list-repos" to="/" className="link">
    Home
  </Link>
);
