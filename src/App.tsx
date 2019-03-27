import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./css/index.css";

import Header from "./components/Header"

import Faction from './views/Faction';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/faction" component={Faction} />
            <Redirect from="*" to="/" />
          </Switch>
          <div id="background" />
        </div>
      </Router>
    );
  }
}

export default App;
