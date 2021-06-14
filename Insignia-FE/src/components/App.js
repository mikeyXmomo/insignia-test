import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Layout from "./Layout/Layout";

export default function App() {
  // global

  return (
    <Router>
      <Switch>
        <PublicRoute path="/" exact component={Layout} />
      </Switch>
    </Router>
  );

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
}
