import React from "react";
import { Link } from "react-router-dom";

export const AddRepo = () => (
  <div data-testid="app-add-repo">
    <Link data-testid="list-repos" to="/" className="link">
      Home
    </Link>
  </div>
);
