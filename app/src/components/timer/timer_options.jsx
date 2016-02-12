import React from 'react';

class TimerOptions extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render () {
    return (
      <div className="timer-options">
        <button className="start-timer">Start</button>
        <button className="pause-timer">Pause</button>
      </div>
    );
  }
}

export default TimerOptions;
