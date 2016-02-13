import React from 'react';
import { timeFormatConverter, calcElapsedTime } from '../../utilities/timer.js';

class Timer extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleController = this.handleController.bind(this);
    this.state={
      start: new Date().getTime(),
      remainingTime: this.props.timerLength * 60000,
      elapsedTime: 0,
      started: false,
      paused: false
    };
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  handleController (e) {
    e.preventDefault();

    const option = e.currentTarget.textContent;

    switch (option) {
      case "Start":
        this.setState({ start: new Date().getTime(), started: true });
        this.interval = window.setInterval( () => {
          this.setState({ elapsedTime: new Date().getTime() - this.state.start });
        }, 100);
        this.props.updateToDoPomodoro("Start");
        break;
      case "Pause":
        clearInterval(this.interval);
        this.setState({ paused: true });
        this.props.updateToDoPomodoro("Pause", Math.floor(this.state.remainingTime / 60000));
        break;
      case "Resume":
        this.setState({ start: new Date().getTime() - this.state.elapsedTime, paused: false });
        this.interval = window.setInterval( () => {
          this.setState({ elapsedTime: new Date().getTime() - this.state.start });
        }, 100);
        break;
    }
  }

  render () {
    const klass = `${ this.props.klass }-timer`;
    const labelText = this.props.klass.charAt(0).toUpperCase() + this.props.klass.slice(1);
    const remainingTime = this.state.remainingTime - this.state.elapsedTime;
    const timerText = timeFormatConverter(remainingTime);

    let buttonText;

    if (!this.state.started) {
      buttonText = "Start";
    } else if (this.state.started && this.state.paused) {
      buttonText = "Resume";
    } else {
      buttonText = "Pause";
    }

    return (
      <div className={ klass }>
        <label className="timer-label">{ labelText }</label>

        <button className="timer-controller"
          onClick={ this.handleController }>{ buttonText }</button>

        <label className="timer-countdown">{ timerText }</label>
      </div>
    );
  }
}

export default Timer;
