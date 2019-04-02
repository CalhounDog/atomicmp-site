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

// tslint:disable: jsx-no-lambda
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

interface IAppState {
  user: (IUser | undefined);
}

class App extends React.Component {
  public state: IAppState = {
    user: undefined
  }

  constructor(props: any) {
    super(props);
    this.fetchAuth = this.fetchAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchAuth();
  }

  public render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user} logout={this.logout} />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route
              path="/login"
              render={(routeProps) => (
                <Login {...routeProps} fetchAuth={() => this.fetchAuth()} />
              )}
            />
            <Route
              path="/register"
              render={(routeProps) => (
                <Register
                  {...routeProps}
                  fetchAuth={() => this.fetchAuth()}
                />
              )}
            />
            <Route path="/faction" component={Faction} />
            <Redirect from="*" to="/" />
          </Switch>
          <div id="background" />
        </div>
      </Router>
    );
  }

  public async fetchAuth() {
    const token = window.sessionStorage.getItem('authToken');
    if (token) {
      const instance = axios.create({
        baseURL: REACT_APP_BACKEND_URL,
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'json',
        timeout: 5000
      });
      const response = await instance.get("/me")
      try {
        let user;
        if (response.data !== "") {
          user = response.data;
        }
        this.setState({ user });
      }
      catch(err) {
        console.error(err.message);
      }
    }
  }

  public logout() {
    window.sessionStorage.removeItem("authToken");
    this.setState({ user: undefined });
    document.location.href = "/";
  }
}

export default App;
