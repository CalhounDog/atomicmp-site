import { createBrowserHistory } from "history";
import * as React from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import "./css/index.css";

import Faction from './views/Faction';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

class App extends React.Component {
  public render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/faction" component={Faction} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    )
  }
}

export default App;
