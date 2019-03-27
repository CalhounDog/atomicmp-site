import * as React from "react";
import Header from "../components/Header";

class Login extends React.Component {
  public render() {
    return (
      <div>
        <Header active="login"/>
        <h1>Login</h1>
      </div>
    )
  }
}

export default Login;
