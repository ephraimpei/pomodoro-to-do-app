import React from 'react';
import Timer from './timer.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';

class TimerDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.pomodoroTimerFinished = this.pomodoroTimerFinished.bind(this);
    this.breakTimerFinished = this.breakTimerFinished.bind(this);
    this.longBreakTimerFinished = this.longBreakTimerFinished.bind(this);
    this.state={ turn: "pomodoro" };
  }

  pomodoroTimerFinished () {
    this.props.finishPomodoro(this.props.numCompleted);

    if ((this.props.numCompleted + 1) % 4 !== 0) {
      this.setState({ turn: "break"});
    } else {
      this.setState({ turn: "longbreak"});
    }
  }

  breakTimerFinished () {
    displayFlashMessage("Break time's over!");

    this.setState({ turn: "pomodoro" });
  }

  longBreakTimerFinished () {
    displayFlashMessage("Long break time's over!");

    this.setState({ turn: "pomodoro" });
  }

  render () {
    let pomodoroDisabled, breakDisabled, longBreakDisabled;

    if (this.props.complete) {
      [pomodoroDisabled, breakDisabled, longBreakDisabled] = [true, true, true];
    } else {
      switch (this.state.turn) {
        case "pomodoro":
          [pomodoroDisabled, breakDisabled, longBreakDisabled] = [false, true, true];
          break;
        case "break":
          [pomodoroDisabled, breakDisabled, longBreakDisabled] = [true, false, true];
          break;
        case "longbreak":
          [pomodoroDisabled, breakDisabled, longBreakDisabled] = [true, true, false];
          break;
      }
    }

    return (
      <div className="timer-display">
        <Timer klass="pomodoro"
          imgUrl=""
          timerLength={ this.props.toDo.pomodoro_length }
          timerFinished={ this.pomodoroTimerFinished }
          done={ this.props.complete }
          turn={ this.state.turn }
          disabled={ pomodoroDisabled } />

        <Timer klass="short-break"
          imgUrl=""
          timerLength={ this.props.toDo.break_length }
          timerFinished={ this.breakTimerFinished }
          done={ this.props.complete }
          turn={ this.state.turn }
          disabled={ breakDisabled } />

        <Timer klass="long-break"
          imgUrl=""
          timerLength={ this.props.toDo.long_break_length }
          timerFinished={ this.longBreakTimerFinished }
          done={ this.props.complete }
          turn={ this.state.turn }
          disabled={ longBreakDisabled } />
      </div>
    );
  }
}

export default TimerDisplay;
