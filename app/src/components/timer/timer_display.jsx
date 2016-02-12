import React from 'react';

class TimerDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    // <Timer length={ this.props.timerLength }
    //   finished={ this.props.timerFinished }
    //   updatePomodoro={ this.props.updatePomodoro }/>
    return (
      <div className="timer-display">
        <div className="pomodoro-timer">
          <label>Pomodoro Timer</label>

          <div className="timer-display">

          </div>
        </div>

        <div className="break-timer">
          <label>Break Timer</label>
        </div>

        <div className="long-break-timer">
          <label>Long Break Timer</label>
        </div>
      </div>
    );
  }
}

export default TimerDisplay;
