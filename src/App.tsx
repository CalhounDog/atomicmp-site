// tslint:disable no-console
import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./css/index.css";

import backend from "./utils/network";

import Header from "./components/Header";
import Spinner from "./components/Spinner";

import IUser from "./models/IUser";

import Download from './views/Download';
import Faction from "./views/Faction";
import Home from "./views/Home";
import Login from "./views/Login";
import Map from './views/Map';
import Recovery from "./views/Recovery";
import Register from "./views/Register";
import User from './views/User';
import FactionsList from "./views/FactionsList";
import UsersList from "./views/UsersList";

// tslint:disable: jsx-no-lambda

interface IAppState {
  user: (IUser | undefined);
  loading: boolean;
}

class App extends React.Component {
  public state: IAppState = {
    loading: true,
    user: undefined,
  }

  constructor(props: any) {
    super(props);
    this.fetchAuth = this.fetchAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchAuth().then(() => {
      this.setState({loading: false});
      this.forceUpdate();
    });
  }

  public render() {
    if (this.state.loading) {
      return Spinner()
    }


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
            <Route path="/faction/:factionId" component={Faction} />
            <Route path="/factions" component={FactionsList} />
            <Route
              path="/recovery"
              render={(routeProps) => (
                <Recovery
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/user/:targetUserId"
              render={(routeProps) => (
                <User
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/users"
              render={(routeProps) => (
                <UsersList
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/map"
              render={(routeProps) => {
                if (!this.state.user) {
                  return <Redirect to="/"/>
                } else {
                  return <Map user={this.state.user}
                    {...routeProps}
                  />
                }
              }}
            />
            <Route
              path="/download"
              render={(routeProps) => (
                <Download
                  {...routeProps}
                />
              )}
            />
            <Redirect from="*" to="/" />
          </Switch>
          <div id="background" />
        </div>
      </Router>
    );
  }

  public async fetchAuth() {
    const token = window.sessionStorage.getItem("authToken");
    if (token) {
      const response = await backend.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000
      })
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
