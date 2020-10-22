import { useState, useEffect } from "react";

export const useRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  return { data: { repos }, loading };
};
