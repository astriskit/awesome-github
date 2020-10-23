import { createContext } from "react";

export const StoreContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  hasItem: () => {},
});
