import React from 'react';
import PomodoroIndex from '../pomodoros/pomodoro_index.jsx';
import TimerDisplay from '../timer/timer_display.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoForm from './todo_form.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class ToDoShowItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      complete: this.props.attr.complete,
      showDetails: false,
      showEditForm: false
     };
  }

  deleteToDoItem (e) {
    e.preventDefault();

    ApiToDoUtil.delete(this.props.username, this.props.attr._id.$oid, displayFlashMessage);
  }

  toggleEditForm (e) {
    e.preventDefault();

    const newState = this.state.showEditForm ? false : true;

    this.setState({ showEditForm: newState });
  }

  hideForm () {
    this.setState({ showEditForm: false });
  }

  render () {
    const buttonText = this.state.showEditForm ? "Cancel" : "Edit";

    let completeCounter = 0;

    this.props.attr.pomodoros.forEach( (pomodoro) => {
      if (pomodoro.status === "complete") { completeCounter += 1; }
    });

    return (
      <div className="to-do-show-item">
        <header className="to-do-show-item-title">{ this.props.attr.title }</header>

        <label className="complete">Complete?
          <input type="checkbox"
            id="complete"
            checked={ this.state.complete }
            disabled/>
          </label>

        <textarea className="description"
          disabled value={ this.props.attr.description}></textarea>

        <label className="pomodoro-counter">Pomodoros: { this.props.attr.pomodoros.length }</label>

        <label className="complete-counter">Complete: { completeCounter }</label>

        <PomodoroIndex pomodoros={ this.props.attr.pomodoros } />

        <TimerDisplay toDo={ this.props.attr }
          updateToDoPomodoro={ this.props.updateToDoPomodoro }/>
      </div>
    );
  }
}

export default ToDoShowItem;
