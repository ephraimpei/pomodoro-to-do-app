import React from 'react';
import ToDoShowItem from './todo_show_item.jsx';
import ToDoStore from '../../stores/to_do_store.js';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import CurrentUserStore from '../../stores/current_user_store.js';

class ToDoShowPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.updateToDoPomodoro = this.updateToDoPomodoro.bind(this);
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
  }

  componentWillUnmount () {
    ToDoStore.removeChangeListener(this._onChange);
  }

  getStateFromStore () {
    return ToDoStore.findById(this.props.params.id);
  }

  _onChange () {
    this.setState({ toDo: this.getStateFromStore() });
  }

  updateToDoPomodoro (mode, remainingLength) {
    switch (mode) {
      case "Start":
        
        break;
      case "Pause":
        break;

      case "Finished":
        break;
    }
  }

  render () {
    const toDoShowItem = typeof this.state.toDo !== "undefined" ?
      <ToDoShowItem attr={ this.state.toDo } updateToDo={ this.updateToDoPomodoro }/> : ""

    return (
      <div className="to-do-show-page">
        <div className="to-do-show-item-wrapper">
          { toDoShowItem }
        </div>
      </div>
    );
  }
}

export default ToDoShowPage;
