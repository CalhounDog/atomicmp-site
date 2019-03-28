// tslint:disable no-console
import axios from "axios";
import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./css/index.css";

import Header from "./components/Header"

import IUser from "./models/IUser";

import Faction from './views/Faction';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""; 

class App extends React.Component {

  public state: {
    user: (IUser | undefined);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined
    };
    this.fetchAuth = this.fetchAuth.bind(this);
    this.fetchAuth();
  }

  public render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user}/>
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

  public fetchAuth(): (IUser | undefined) {
    const token = window.sessionStorage.getItem('authToken');
    if (token) {
      axios.get(REACT_APP_BACKEND_URL + "/me", {
        headers: { 'Cookie': "jwt=" + token},
        withCredentials: true
      }).then((response) => {
        let user;
        console.log(response)
        if (response.data !== "") {
          user = response.data;
        }
        this.setState({ user })
      }).catch(err => {
        console.error(err.message);
      });
    }
    return undefined;
  }
}

export default App;
