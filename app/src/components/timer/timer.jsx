import React from 'react';
import { timeFormatConverter, calcElapsedTime } from '../../utilities/timer.js';

class Timer extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleController = this.handleController.bind(this);
    this.tickInterval = this.tickInterval.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.performAction = this.performAction.bind(this);
    this.state={
      start: new Date().getTime(),
      // remainingTime: this.props.timerLength * 60000,
      remainingTime: 10000,
      elapsedTime: 0,
      started: false,
      paused: false
    };
  }

  componentWillReceiveProps (nextProps) {
    // if (!nextProps.disabled && !nextProps.done && this.props.klass !== "pomodoro") {
    //   this.performAction("Start");
    // } else if (nextProps.done) {
    //   this.performAction("Stop");
    // }
    if ((this.props.klass !== "pomodoro" && nextProps.turn === "pomodoro") || nextProps.disabled) {
      this.performAction("Stop");
    } else if (nextProps.done) {
      this.performAction("Stop");
    } else if (this.props.klass !== "pomodoro" && !nextProps.disabled) {
      // this.performAction("Start");
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  resetTimer () {
    this.setState({
      start: new Date().getTime(),
      elapsedTime: 0,
      started: false,
      paused: false
    });
  }

  tickInterval () {
    if (this.state.elapsedTime >= this.state.remainingTime) {
      clearInterval(this.interval);
      this.props.timerFinished();
      this.resetTimer();
    }

    this.setState({ elapsedTime: new Date().getTime() - this.state.start });
  }

  handleController (e) {
    e.preventDefault();

    const option = e.currentTarget.textContent;

    this.performAction(option);
  }

  performAction (option) {
    switch (option) {
      case "Start":
        this.setState({ start: new Date().getTime(), started: true });
        this.interval = window.setInterval(this.tickInterval, 100);
        break;
      case "Pause":
        clearInterval(this.interval);
        this.setState({ paused: true });
        break;
      case "Resume":
        this.setState({ start: new Date().getTime() - this.state.elapsedTime, paused: false });
        this.interval = window.setInterval(this.tickInterval, 100);
        break;
      case "Stop":
        clearInterval(this.interval);
    }
  }

  render () {
    const klass = `timer ${ this.props.klass }`;
    const labelText = this.props.klass.charAt(0).toUpperCase() + this.props.klass.slice(1);
    const remainingTime = this.state.remainingTime - this.state.elapsedTime;
    const timerText = timeFormatConverter(remainingTime);

    let buttonText, buttonClass;

    if (this.props.disabled) {
      buttonClass = "timer-controller disabled";
    } else {
      buttonClass = "timer-controller";
    }

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

        <button className={ buttonClass }
          onClick={ this.handleController }
          disabled={ this.props.disabled }>{ buttonText }</button>

        <label className="timer-countdown">{ timerText }</label>
      </div>
    );
  }
}

export default Timer;
