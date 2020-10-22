import React from "react";
import "./Error.css";

export const Error = ({ message = "" }) => (
  <div className="error">Error: "{message}"</div>
);
