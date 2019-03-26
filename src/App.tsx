import { createBrowserHistory } from "history";
import * as React from 'react';
import { Route, Router, Switch } from "react-router";
import Header from "./components/Header";
import './css/App.css';
import Home from "./views/Home";
import Login from "./views/Login";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />

        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
        <div id="background" />
      </div>
    );
  }
}

export default App;
