import { createBrowserHistory } from "history";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from "react-router";
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}/>
      <Redirect from='*' to='/' />
    </Switch>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
