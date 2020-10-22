import { createContext } from "react";

export const StoreContext = createContext({
  items: [],
  addItem: () => {},
  add: () => {},
  clear: () => {},
});
