import React from 'react';
import $ from 'jquery';
import PomodoroIndex from '../pomodoros/pomodoro_index.jsx';
import TimerDisplay from '../timer/timer_display.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoForm from './todo_form.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class ToDoShowItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.state = { complete: this.props.attr.complete, timerAutoStart: true };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ complete: nextProps.attr.complete });
  }

  componentDidMount () {
    $(".auto-start-on-radio").prop("checked", this.state.timerAutoStart);
    $(".auto-start-off-radio").prop("checked", !this.state.timerAutoStart);
  }

  handleAutoChange (e) {
    const timerAutoStart = e.currentTarget.value === "on" ? true : false;

    this.setState({ timerAutoStart });
  }

  render () {
    const buttonText = this.state.showEditForm ? "Cancel" : "Edit";

    let completeCounter = 0;

    this.props.attr.pomodoros.forEach( (pomodoro) => {
      if (pomodoro.complete) { completeCounter += 1; }
    });

    const pomodorosToLongBreak = 4 - (completeCounter % 4);

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

        <div className="stats-wrapper">
          <label className="complete-counter">Complete: { completeCounter }</label>
          <label className="pomodoro-counter">Incomplete:
            { this.props.attr.pomodoros.length - completeCounter }</label>
          <label className="pomodoro-counter">Total: { this.props.attr.pomodoros.length }</label>
        </div>

        <PomodoroIndex pomodoros={ this.props.attr.pomodoros } />

        <label className="pomodoro-long-break-counter">
          Pomodoros until long break: { pomodorosToLongBreak }</label>

        <div className="auto-start-wrapper">
          <label className="auto-start-label">Timer auto start: </label>

          <label className="auto-start-on-label">on
            <input type="radio" name="test" className="auto-start-on-radio"
              onChange={ this.handleAutoChange } value="on" />
          </label>

          <label className="auto-start-off-label">off
            <input type="radio" name="test" className="auto-start-off-radio"
              onChange={ this.handleAutoChange } value="off" />
          </label>
        </div>


        <TimerDisplay toDo={ this.props.attr }
          numCompleted={ completeCounter }
          complete={ this.state.complete }
          finishPomodoro={ this.props.finishPomodoro }
          autoMode={ this.state.timerAutoStart }/>
      </div>
    );
  }
}

export default ToDoShowItem;
