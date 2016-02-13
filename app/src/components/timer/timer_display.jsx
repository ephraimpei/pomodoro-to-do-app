import React from 'react';
import Timer from './timer.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';

class TimerDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.pomodoroTimerFinished = this.pomodoroTimerFinished.bind(this);
    this.breakTimerFinished = this.breakTimerFinished.bind(this);
    this.longBreakTimerFinished = this.longBreakTimerFinished.bind(this);
  }

  pomodoroTimerFinished () {

  }

  breakTimerFinished () {

  }

  longBreakTimerFinished () {

  }

  render () {
    return (
      <div className="timer-display">
        <Timer klass="pomodoro"
          imgUrl=""
          timerLength={ this.props.toDo.pomodoro_length }
          timerFinished={ this.pomodoroTimerFinished }
          updateToDo={ this.props.updateToDo } />

        <Timer klass="break"
          imgUrl=""
          timerLength={ this.props.toDo.break_length }
          timerFinished={ this.breakTimerFinished } />

        <Timer klass="long-break"
          imgUrl=""
          timerLength={ this.props.toDo.long_break_length }
          timerFinished={ this.longBreakTimerFinished } />


      </div>
    );
  }
}

export default TimerDisplay;
