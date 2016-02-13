import React from 'react';
import { timeFormatConverter, calcElapsedTime } from '../../utilities/timer.js';

class Timer extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleController = this.handleController.bind(this);
    this.tickInterval = this.tickInterval.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.state={
      start: new Date().getTime(),
      // remainingTime: this.props.timerLength * 60000,
      remainingTime: 10000,
      elapsedTime: 0,
      started: false,
      paused: false
    };
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  resetTimer () {
    clearInterval(this.interval);

    this.setState({
      start: new Date().getTime(),
      elapsedTime: 0,
      started: false,
      paused: false
    });
  }

  tickInterval () {
    if (this.state.elapsedTime >= this.state.remainingTime) {
      this.props.timerFinished();
      this.resetTimer();
    }

    this.setState({ elapsedTime: new Date().getTime() - this.state.start });
  }

  handleController (e) {
    e.preventDefault();

    const option = e.currentTarget.textContent;

    switch (option) {
      case "Start":
        this.setState({ start: new Date().getTime(), started: true });
        this.interval = window.setInterval(this.tickInterval, 100);
        break;
      case "Pause":
        clearInterval(this.interval);
        this.setState({ paused: true });
        this.props.update("Pause");
        break;
      case "Resume":
        this.setState({ start: new Date().getTime() - this.state.elapsedTime, paused: false });
        this.interval = window.setInterval(this.tickInterval, 100);
        break;
    }
  }

  render () {
    const klass = `${ this.props.klass }-timer`;
    const labelText = this.props.klass.charAt(0).toUpperCase() + this.props.klass.slice(1);
    const remainingTime = this.state.remainingTime - this.state.elapsedTime;
    const timerText = timeFormatConverter(remainingTime);

    let buttonText;

    if (!this.state.started && this.props.klass === "pomodoro") {
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
