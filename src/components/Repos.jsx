import React from "react";
import "./Repos.css";

export const Repos = ({ repos = [] }) => (
  <ul data-testid="repos-list" className="repos-list">
    {repos.map(({ href, title, name }) => (
      <li key={href}>
        <a title={title} href={href} target="_blank" rel="noopener noreferrer">
          {name || title}
        </a>
      </li>
    ))}
  </ul>
);
