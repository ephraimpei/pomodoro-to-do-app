import React from 'react';
import ToDoSearch from './to_do_search.jsx';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';

class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.successfulToDoSearch = this.successfulToDoSearch.bind(this);
    this.failedToDoSearch = this.failedToDoSearch.bind(this);
    this.logout = this.logout.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  
  successfulToDoSearch (toDoId) {
    this.props.router.push(`/user/${ currentUserStore.get().username }/todo/${ toDoId }`);
  }

  failedToDoSearch (message) {
    displayFlashMessage(message);
  }

  logout (e) {
    e.preventDefault();

    ApiSessionUtil.logout(displayFlashMessage);
  }

  render () {
    return (
      <div className="header">
        <div className="nav-bar">
          <img className="logo" src="/images/pomodoro.png"/>
          <button className="user-home-page" onClick={ this.props.goHome }>To Do List</button>
          <ToDoSearch successfulSearch={ this.props.successfulUserSearch }/>
          <button className="logout" onClick={ this.logout }>Logout</button>
        </div>
      </div>
     );
  }
}

export default NavBar;
