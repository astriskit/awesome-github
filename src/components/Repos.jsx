import React from "react";
import "./Repos.css";

export const Repos = ({ repos = [], iterator, iteratorProps = {} }) => (
  <ul data-testid="repos-list" className="repos-list">
    {repos.map(({ href, title, name }) => (
      <li key={href}>
        {iterator && typeof iterator === "function" ? (
          iterator({ href, title, name, ...iteratorProps })
        ) : (
          <a
            title={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name || title}
          </a>
        )}
      </li>
    ))}
  </ul>
);
