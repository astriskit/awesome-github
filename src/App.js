import React from "react";
import { Switch, Route } from "react-router-dom";
import { Index } from "./pages/index";
import { AddRepo } from "./pages/add-repo";
import { Empty } from "./pages/empty";
import { useStore } from "./utils/useStore";
import { StoreContext } from "./utils/store-context";
import "./App.css";

export const AppRouter = () => (
  <main data-testid="app">
    <header className="banner">Github Bookmark Manager</header>
    <Switch>
      <Route exact path="/add-repo" component={AddRepo} />
      <Route exact path="/" component={Index} />
      <Route component={Empty} />
    </Switch>
  </main>
);

function App({ initial }) {
  const store = useStore(initial);
  return (
    <StoreContext.Provider value={store}>
      <AppRouter />
    </StoreContext.Provider>
  );
}

export default App;
