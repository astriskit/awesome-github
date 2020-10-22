import React from "react";
import "./Repos.css";

export const Repos = ({ repos = [] }) => (
  <ul data-testid="repos-list" className="repos-list">
    {repos.map(({ href, title, name }) => (
      <li key={href}>
        <a title={title} href={href}>
          {name || title}
        </a>
      </li>
    ))}
  </ul>
);
