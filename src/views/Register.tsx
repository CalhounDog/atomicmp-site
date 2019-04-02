import axios from "axios";
import * as React from "react";
import { Redirect } from 'react-router-dom';
import Container from "../components/Container";
import "../css/Form.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ""; 

interface IFormData {
  confirmPassword: string;
  key: string;
  password: string;
  username: string;
}

interface IRegistrationProps {
  fetchAuth: () => void;
}

interface IRegistrationState {
  error: string;
  formData: IFormData;
  redirect: boolean;
  submitting: boolean;
}

class Register extends React.Component<
  IRegistrationProps,
  Partial<IRegistrationState>
> {
  public state: IRegistrationState = {
    error: "",
    formData: {
      confirmPassword: "",
      key: "",
      password: "",
      username: ""
    },
    redirect: false,
    submitting: false
  };

  constructor(props: any) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <h1>Join AMP</h1>
          {this.renderForm()}
        </Container>
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

  public handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, username: value }
    });
  }
  public handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, password: value }
    });
  }
  public handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, confirmPassword: value }
    });
  }
  public handleKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, key: value }
    });
  }

  public async submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({ submitting: true });

    if (this.state.formData.password !== this.state.formData.confirmPassword) {
      this.setState({ error: "Passwords do not match :(", submitting: false });
      return;
    }
    try {
      const {data} = await axios.post(REACT_APP_BACKEND_URL + "/register", this.state.formData)

      window.sessionStorage.setItem("authToken", data.token);
      await this.props.fetchAuth();
      this.setState({redirect: true});
    }
    catch(error) {
      this.setState({ error: error.message, submitting: false });
    }
  }
}

export default Register;
