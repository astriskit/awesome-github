import axios from "axios";
import { useState, useEffect } from "react";
import { ghSearchUrl } from "./constants";

const extract = (items) =>
  items.map(({ html_url: href, name }) => ({ href, name, title: name }));

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [queryOp, setQueryOp] = useState({ query: "", op: "" });
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          const { op, query } = queryOp;
          let url = `${ghSearchUrl}?q=`;
          if (op === "by-user") {
            url += `user:${query}`;
          } else {
            url += query;
          }
          url += "+is:public";
          const result = await axios.get(url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          });
          setData(extract(result.data.items));
          setErr("");
        } catch (err) {
          setErr(err?.response?.data?.message ?? err.message);
        } finally {
          setLoading(false);
          setQueryOp({ query: "", op: "" });
        }
      })();
    }
  }, [loading, queryOp]);

  const handleSearch = (op, query) => {
    setQueryOp({ op, query });
    setLoading(true);
  };

  return { data, error: err, loading, handleSearch };
};
