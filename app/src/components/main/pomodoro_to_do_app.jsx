import React from 'react';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import currentUserStore from '../../stores/current_user_store.js';
import { displayFlashMessage } from '../../utilities/flash.js';

class PomodoroToDoApp extends React.Component {
  constructor (props) {
    super(props);
    this.navigateToUserHomePage = this.navigateToUserHomePage.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = { header: currentUserStore.isLoggedIn() };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    ApiSessionUtil.fetchSession(displayFlashMessage);
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this._onChange);
  }

  navigateToUserHomePage () {
    this.context.router.push('/user/' + currentUserStore.get().username);
  }

  _onChange () {
    this.setState({ header: currentUserStore.isLoggedIn() });
  }

  render () {
    const headerClass = this.state.header ? "header" : "header not-visible";

    return (
        <div className="main-app">
          { this.props.children }
        </div>
     );
  }
}

export default PomodoroToDoApp;
