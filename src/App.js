import React from "react";
import { Switch, Route } from "react-router-dom";
import { Index } from "./pages/index";
import { AddRepo } from "./pages/add-repo";

function App() {
  return (
    <div data-testid="app">
      <div>Github Bookmark Manager</div>
      <Switch>
        <Route path="/add-repo" component={AddRepo} />
        <Route path="/" component={Index} />
      </Switch>
    </div>
  );
}

export default App;
