import React from "react";
import { Link } from "react-router-dom";

export const Index = () => {
  return (
    <div data-testid="app-home">
      <Link data-testid="add-repo" to="/add-repo" className="link">
        + Add
      </Link>
    </div>
  );
};
