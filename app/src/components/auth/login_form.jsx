import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import { removeInvalidClass } from '../../utilities/auth.js';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.logIntoDemoAccount = this.logIntoDemoAccount.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = { username: "", password: ""};
  }

  handleLoginSubmission (e) {
    if (e) { e.preventDefault(); }

    $(".submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    ApiSessionUtil.login(formData, this.props.success, this.props.failure);
  }

  handleKeyDown (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleLoginSubmission();
    }
  }

  logIntoDemoAccount (e) {
    if (e) { e.preventDefault(); }

    removeInvalidClass("form-username-input");
    removeInvalidClass("form-password-input");

    $(".login-form-demo-account").addClass("disabled").prop("disabled", true);
    $(".submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("username", "test_account");
    formData.append("password", "password");

    $(".form-username-input").val("test_account");
    $(".form-password-input").val("password");

    ApiSessionUtil.login(formData, this.props.success, this.props.failure);
  }

  changeUsername (e) {
    removeInvalidClass("form-username-input");

    this.props.deleteUsernameErrors();

    this.setState({ username: e.currentTarget.value });
  }

  changePassword (e) {
    removeInvalidClass("form-password-input");

    this.props.deletePasswordErrors();

    this.setState({ password: e.currentTarget.value });
  }

  render() {
    const usernameErrors = this.props.usernameErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const passwordErrors = this.props.passwordErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    return (
      <form className="login-form"
        onKeyDown={ this.handleKeyDown }
        onSubmit={ this.handleLoginSubmission }>
        <div className="login-form-wrapper">
          <button className="login-form-demo-account"
            onClick={ this.logIntoDemoAccount }>Demo Account</button>

          <label>Username
          <ul className="form-error-wrapper">
            { usernameErrors }
          </ul>
          <input
            className="form-username-input"
            type="text"
            onChange={ this.changeUsername }/>
          </label>

          <label>Password
          <ul className="form-error-wrapper">
            { passwordErrors }
          </ul>
          <input
            className="form-password-input"
            type="password"
            onChange={ this.changePassword }/>
          </label>

          <button className="submit" type="submit">Log In!</button>
          <Link to={ `/user/new` }>Create a user</Link>
        </div>
      </form>
    );
  }
}

export default LoginForm;
