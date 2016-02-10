import React from 'react';
import LoginForm from './login_form.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.failedLogin = this.failedLogin.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  successfulLogin () {

  }

  failedLogin () {

  }
  
  render () {
    return (
      <div className="login-page">
        <h1>Welcome to the Pomodoro To Do App!</h1>
        <h2>Please login to continue.</h2>
        <LoginForm success={ this.successfulLogin }
          failure={ this.failedLogin }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }/>
      </div>
    );
  }
}

export default LoginPage;
