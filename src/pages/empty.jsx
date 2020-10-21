import React from "react";

export const Empty = ({ history }) => {
  const goBack = () => history.goBack();
  return (
    <div>
      <div>Page not found</div>
      <div role="button" onClick={goBack} className="link">
        Click to go back
      </div>
    </div>
  );
};
