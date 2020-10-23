import { useState, useEffect } from "react";
import { logger } from "../utils/logger";
import { storeKey as storeName } from "../utils/constants";

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
    try {
      const storey = JSON.stringify(store);
      localStorage.setItem(storeName, storey);
    } catch (err) {
      setStore([]);
      logger.error("Possibly invalid JSON; Emptied store!");
    }
  }, [store]);

  const removeItem = (href) => {
    const list = store.filter(({ href: h }) => h !== href);
    setStore(list);
  };

  const addItem = (ob) => {
    setStore([...store, ob]);
  };

  const hasItem = (href) => {
    return store.find(({ href: h }) => href === h);
  };

  return {
    addItem,
    get items() {
      return [...store];
    },
    removeItem,
    hasItem,
  };
};
