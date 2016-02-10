import React from 'react';
import SignUpForm from './sign_up_form.jsx';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.successfulSignUp = this.successfulSignUp.bind(this);
    this.failedSignUp = this.failedSignUp.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  successfulSignUp (message, username) {

  }

  failedSignUp (errors) {

  }

  render () {
    debugger;
    return (
      <div className="sign-up-page">
        <h1>Welcome to the Pomodoro To Do App!</h1>
        <h2>Create a new user to get going!</h2>
        <SignUpForm success={ this.successfulSignUp }
          failure={ this.failedSignUp }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }/>
      </div>
    );
  }
}

export default SignUpPage;
