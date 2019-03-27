import axios from "axios";
import * as React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import "../css/Form.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""; 

interface IFormData {
  confirmPassword: string;
  key: string;
  password: string;
  username: string;
}

interface IRegistrationState {
  error: string;
  formData: IFormData;
  submitting: boolean;
}

// tslint:disable: no-console
class Register extends React.Component {
  public state: IRegistrationState = {
    error: "",
    formData: {
      confirmPassword: "",
      key: "",
      password: "",
      username: ""
    },
    submitting: false
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      formData: {
        confirmPassword: "",
        key: "",
        password: "",
        username: ""
      },
      submitting: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  public render() {
    return (
      <div>
        <Header active="register" />
        <Container>
          <h1>Join AMP</h1>
          {this.renderForm()}
        </Container>

        <div id="background" />
      </div>
    );
  }

  public renderForm() {
    return (
      <form onSubmit={this.submitForm}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Wastelander"
            value={this.state.formData.username}
            onChange={this.handleUsernameChange}
            pattern="[A-Za-z_ ]{3,24}"
            autoComplete="off"
            required={true}
          />
        </label>
        <p className="input-description">
          Username must be between 3-24 characters and be only A-Za-z.
        </p>
        <label>
          Password:
          <input
            type="password"
            name="password"
            autoComplete="off"
            pattern=".{8,}"
            placeholder="********"
            value={this.state.formData.password}
            onChange={this.handlePasswordChange}
            required={true}
          />
        </label>
        <p className="input-description">
          Password must be 8 or more characters.
        </p>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            pattern=".{8,}"
            placeholder="********"
            value={this.state.formData.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
            required={true}
          />
        </label>

        <label>
          Key:
          <input
            type="text"
            name="key"
            pattern=".{23}"
            autoComplete="off"
            placeholder="AMP-????-???-????-????"
            value={this.state.formData.key}
            onChange={this.handleKeyChange}
            required={true}
          />
        </label>
        <p className="error">{this.state.error}</p>
        <input type="submit" value="Create Account" />
      </form>
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
  public handleConfirmPasswordChange(event: any) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, confirmPassword: value }
    });
  }
  public handleKeyChange(event: any) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, key: value }
    });
  }

  public submitForm(event: any) {
    event.preventDefault();
    console.log(this.state.formData);
    this.setState({ submitting: true });

    if (this.state.formData.password !== this.state.formData.confirmPassword) {
      this.setState({error: "Passwords do not match :(", submitting: false})
      return;
    }

    axios.post(REACT_APP_BACKEND_URL+"/register", this.state.formData).then(response => {
      const { data } = response;
      window.sessionStorage.setItem("authToken", data.token);
      const token = window.sessionStorage.getItem('authToken');
      if (token) {
        document.cookie = "jwt=" + token
      }
      document.location.href = "/"
    }).catch(error => {
      this.setState({ error: error.message })
    }).then(() => {
      this.setState({ submitting: false })
    })
  }
}

export default Register;
