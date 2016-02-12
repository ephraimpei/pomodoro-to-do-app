import React from 'react';
import LoginForm from './login_form.jsx';
import currentUserStore from '../../stores/current_user_store.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import { failedAuthErrors } from '../../utilities/auth.js';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.failedLogin = this.failedLogin.bind(this);
    this.deleteUsernameErrors = this.deleteUsernameErrors.bind(this);
    this.deletePasswordErrors = this.deletePasswordErrors.bind(this);
    this._ensureNotAlrdyLoggedIn = this._ensureNotAlrdyLoggedIn.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {

  }

  componentDidMount () {
    currentUserStore.addChangeListener(this._ensureNotAlrdyLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this._ensureNotAlrdyLoggedIn);
  }

  successfulLogin (message, username) {
    this.context.router.push('/user/' + username);

    displayFlashMessage(message);
  }

  failedLogin (errors) {
    const [usernameErrors, passwordErrors] = failedAuthErrors(errors);

    this.setState({ usernameErrors, passwordErrors });
  }

  deleteUsernameErrors () {
    this.setState({ usernameErrors: [] })
  }

  deletePasswordErrors () {
    this.setState({ passwordErrors: [] })
  }

  _ensureNotAlrdyLoggedIn () {
    if (currentUserStore.isLoggedIn()) {
      this.context.router.push('/user/' + currentUserStore.get().username);
    }
  }

  render () {
    return (
      <div className="login-page">
        <h1>Welcome to the Pomodoro To Do App!</h1>
        <h2>Please login to continue.</h2>
        <LoginForm success={ this.successfulLogin }
          failure={ this.failedLogin }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }
          deleteUsernameErrors={ this.deleteUsernameErrors }
          deletePasswordErrors={ this.deletePasswordErrors }/>
      </div>
    );
  }
}

export default LoginPage;
