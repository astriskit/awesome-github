import React from "react";
import { Switch, Route } from "react-router-dom";
import { Index } from "./pages/index";
import { AddRepo } from "./pages/add-repo";
import { Empty } from "./pages/empty";
import "./App.css";

function App() {
  return (
    <main data-testid="app">
      <header className="banner">Github Bookmark Manager</header>
      <Switch>
        <Route exact path="/add-repo" component={AddRepo} />
        <Route exact path="/" component={Index} />
        <Route component={Empty} />
      </Switch>
    </main>
  );
}

export default App;
