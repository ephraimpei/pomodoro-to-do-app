import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import CurrentUserStore from '../../stores/current_user_store.js';
import { displayFlashMessage } from '../../utilities/flash.js';

class PomodoroToDoApp extends React.Component {
  constructor (props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.state = { header: CurrentUserStore.isLoggedIn() };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    ApiSessionUtil.fetchSession(displayFlashMessage);
  }

  componentDidMount () {
    CurrentUserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    CurrentUserStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({ header: CurrentUserStore.isLoggedIn() });
  }

  render () {
    const navBar = this.state.header ? <NavBar router={ this.context.router } /> : ""

    return (
        <div className="main-app">
          { navBar }
          { this.props.children }
        </div>
     );
  }
}

export default PomodoroToDoApp;
