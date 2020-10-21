import React from "react";
import { Switch, Route } from "react-router-dom";
import { Index } from "./pages/index";
import { AddRepo } from "./pages/add-repo";
import { Empty } from "./pages/empty";

function App() {
  return (
    <div data-testid="app">
      <div>Github Bookmark Manager</div>
      <Switch>
        <Route exact path="/add-repo" component={AddRepo} />
        <Route exact path="/" component={Index} />
        <Route component={Empty} />
      </Switch>
    </div>
  );
}

export default App;
