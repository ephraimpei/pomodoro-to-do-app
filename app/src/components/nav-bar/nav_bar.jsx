import React from 'react';
import ToDoSearch from './to_do_search.jsx';
import Options from './options.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.successfulToDoSearch = this.successfulToDoSearch.bind(this);
    this.failedToDoSearch = this.failedToDoSearch.bind(this);
  }

  successfulToDoSearch (toDoId) {
    this.props.router.push(`/user/${ currentUserStore.get().username }/todo/${ toDoId }`);
  }

  failedToDoSearch (message) {
    displayFlashMessage(message);
  }

  render () {
    return (
      <div className="header">
        <div className="nav-bar">
          <img className="logo" src="/images/pomodoro.png"/>
          <button className="user-home-page" onClick={ this.props.goHome }>To Do List</button>
          <ToDoSearch successfulSearch={ this.props.successfulUserSearch }/>
          <Options logoutSuccess={ this.logoutSuccess }/>
        </div>
      </div>
     );
  }
}

export default NavBar;
