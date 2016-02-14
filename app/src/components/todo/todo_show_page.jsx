import React from 'react';
import ToDoShowItem from './todo_show_item.jsx';
import ToDoStore from '../../stores/to_do_store.js';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import CurrentUserStore from '../../stores/current_user_store.js';

class ToDoShowPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.finishPomodoro = this.finishPomodoro.bind(this);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this.state={ toDo: this.getStateFromStore() }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    ApiToDoUtil.fetch(this.props.params.username);
  }

  componentDidMount () {
    ToDoStore.addChangeListener(this._onChange);
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
  }

  componentWillUnmount () {
    ToDoStore.removeChangeListener(this._onChange);
    CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  }

  getStateFromStore () {
    return ToDoStore.findById(this.props.params.id);
  }

  finishPomodoro (numCompleted) {
    ApiToDoUtil.updateToDoPomodoro(this.props.params.username,
      this.props.params.id, numCompleted, displayFlashMessage)
  }

  _onChange () {
    this.setState({ toDo: this.getStateFromStore() });
  }

  _ensureLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) { this.context.router.push('/'); }
  }

  render () {
    const toDoShowItem = typeof this.state.toDo !== "undefined" ?
      <ToDoShowItem attr={ this.state.toDo } finishPomodoro={ this.finishPomodoro }/> : ""

    return (
      <div className="to-do-show-page">
        <label className="logged-in">Logged in as: { CurrentUserStore.get().username }</label>
        
        <div className="to-do-show-item-wrapper">
          { toDoShowItem }
        </div>
      </div>
    );
  }
}

export default ToDoShowPage;
