import React from "react";

export const AddRemoveIterator = ({
  name,
  title,
  href,
  onAdd,
  isAdded,
  onRemove,
}) => {
  const handleAdd = () => {
    onAdd({ name, href, title: name });
  };
  const handleRemove = () => {
    onRemove(href);
  };

  const showAddBtn = isAdded && onAdd && !isAdded(href);
  const showRemoveBtn = isAdded && onRemove && isAdded(href);

  return (
    <div className="flex center" style={{ justifyContent: "space-between" }}>
      <div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "x-large" }}
        >
          {name || title}
        </a>
      </div>
      <div>
        {showRemoveBtn && (
          <button onClick={handleRemove} className="secondary danger">
            -
          </button>
        )}
        {showAddBtn && (
          <button onClick={handleAdd} className="secondary success">
            +
          </button>
        )}
      </div>
    </div>
  );
};
