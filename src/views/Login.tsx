import axios from "axios";
import * as React from "react";
import { Redirect } from 'react-router-dom';
import Container from "../components/Container"
import "../css/Form.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""; 

// tslint:disable: no-console

interface ILoginState {
  redirect: boolean;
  error: string;
  submitting: boolean;
  formData: {
    username: string;
    password: string;
  }
}

class Login extends React.Component {
  public state: ILoginState;

  constructor(props: any) {
    super(props);

    this.state = {
      error: "",
      formData: {
        password: "",
        username: ""
      },
      redirect: false,
      submitting: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Container>
          <h1>Login</h1>
          {this.renderForm()}
        </Container>
      </div>
    );
  }

  public renderForm() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>
            Username
            <input
              type="text"
              name="username"
              pattern="[A-Za-z_ ]{3,24}"
              value={this.state.formData.username}
              onChange={this.handleUsernameChange}
              autoComplete="off"
              required={true}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              pattern=".{8,}"
              value={this.state.formData.password}
              onChange={this.handlePasswordChange}
              autoComplete="off"
              required={true}
            />
          </label>
          <p className="error">{this.state.error}</p>
          <input type="submit" value="Log In"/>
        </form>
      </div>
    );
  }

  public handleUsernameChange(event: any) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, username: value }
    });
  }
  public handlePasswordChange(event: any) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, password: value }
    });
  }

  public submitForm(event: any) {
    event.preventDefault()
    this.setState({ submitting: true })
    axios
      .post(REACT_APP_BACKEND_URL + "/login", this.state.formData)
      .then((response) => {
        const { data } = response;
        window.sessionStorage.setItem("authToken", data.token);

        const token = window.sessionStorage.getItem('authToken');
        if (token) {
          document.cookie = "jwt=" + token
        }
        this.setState({redirect: true})
      })
      .catch((error) => {
        this.setState({ error: error.message, submitting: false });
      });
    
  }
}

export default Login;
