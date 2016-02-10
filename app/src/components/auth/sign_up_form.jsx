import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import apiUserUtil from '../../apiutil/api_user_util.js';

class SignUpForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.handleSignUpSubmission = this.handleSignUpSubmission.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordConf = this.changePasswordConf.bind(this);
    this.state = { username: "", password: "", passwordConf: "" };
  }

  handleSignUpSubmission (e) {
    if (e) { e.preventDefault(); }

    $(".submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("confirm", this.state.passwordConf);

    apiUserUtil.create(formData, this.success, this.failure);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleSignUpSubmission(); }
  }

  changeUsername (e) {
    this.setState({ username: e.currentTarget.value });
  }

  changePassword (e) {
    this.setState({ password: e.currentTarget.value });
  }

  changePasswordConf (e) {
    this.setState({ passwordConf: e.currentTarget.value });
  }

  render() {
    const usernameErrors = this.props.usernameErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const passwordErrors = this.props.passwordErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );
    return (
      <form className="sign-up-form"
        onKeyPress={ this.handleKeyPress }
        onSubmit={ this.handleSignUpSubmission }>

        <div className="sign-up-form-wrapper">
          <label>Username
          <ul className="error-wrapper">
            { usernameErrors }
          </ul>
          <input
            className="form-username-input"
            type="text"
            onChange={ this.changeUsername }/>
          </label>

          <label>Password
          <ul className="error-wrapper">
            { passwordErrors }
          </ul>
          <input
            className="form-password-input"
            type="password"
            onChange={ this.changePassword }/>
          </label>

          <label>Confirm Password
          <input
            className="form-password-input"
            type="password"
            onChange={ this.changePasswordConf }/>
          </label>

          <button className="submit" type="submit">Sign Up!</button>
          <Link to={ `/` }>Already have an account?</Link>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
