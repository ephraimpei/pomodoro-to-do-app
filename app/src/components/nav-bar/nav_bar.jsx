import React from 'react';
import ToDoSearch from './to_do_search.jsx';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import CurrentUserStore from '../../stores/current_user_store.js';

class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.goHome = this.goHome.bind(this);
    this.logout = this.logout.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  goHome (e) {
    e.preventDefault();

    this.props.router.push(`/user/${ CurrentUserStore.get().username }`);
  }

  logout (e) {
    e.preventDefault();

    ApiSessionUtil.logout(displayFlashMessage);
  }

  render () {
    return (
      <div className="header">
        <div className="nav-bar">
          <img className="logo" onClick={ this.goHome } src="/images/logo/pomodoro.png"/>
          <button className="user-home-page" onClick={ this.goHome }>To Do List</button>
          <ToDoSearch username={ CurrentUserStore.get().username }/>
          <button className="logout" onClick={ this.logout }>Logout</button>
          <img className="logo" onClick={ this.goHome } src="/images/logo/pomodoro.png"/>
        </div>
      </div>
     );
  }
}

export default NavBar;
