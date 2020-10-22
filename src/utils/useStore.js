import { useState, useEffect } from "react";
import { logger } from "../utils/logger";
const storeName = "bookmarks";

export const useStore = (initial = undefined) => {
  const [store = [], setStore] = useState(() => {
    if (!initial || !Array.isArray(initial)) {
      try {
        const stored = localStorage.getItem(storeName);
        if (stored) {
          const store = JSON.parse(stored);
          return store;
        } else {
          return [];
        }
      } catch (err) {
        localStorage.removeItem(storeName);
        logger.error("Possibly invalid JSON; Emptied store!");
        return [];
      }
    } else {
      return initial;
    }
  });

  useEffect(() => {
    save();
  }, [store]);

  const clear = () => {
    setStore([]);
  };

  const save = () => {
    try {
      const storey = JSON.stringify(store);
      localStorage.setItem(storeName, storey);
    } catch (err) {
      setStore([]);
      logger.error("Possibly invalid JSON; Emptied store!");
    }
  };

  // const add = (list) => {
  //   setStore(list);
  // };

  const addItem = (ob) => {
    setStore([...store, ob]);
  };

  return {
    addItem,
    get items() {
      return [...store];
    },
    clear,
  };
};
