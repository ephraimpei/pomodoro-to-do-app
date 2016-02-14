import React from 'react';
import { timeFormatConverter, calcElapsedTime } from '../../utilities/timer.js';

class Timer extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleController = this.handleController.bind(this);
    this.tickInterval = this.tickInterval.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.performAction = this.performAction.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.initAudioPlayer = this.initAudioPlayer.bind(this);
    this.state={
      start: new Date().getTime(),
      remainingTime: this.props.timerLength * 60000,
      elapsedTime: 0,
      started: false,
      paused: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.toDoComplete) {
      this.performAction("Stop");
    } else if (nextProps.myTurn && this.props.autoStart && this.props.toDoStarted) {
      this.performAction("Start");
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  componentDidMount () {
    this.initAudioPlayer();
  }

  initAudioPlayer () {
    this.audio = new Audio();
    this.audio.src = "/audio/ding.wav";
  }

  resetTimer () {
    setTimeout( () => {
      this.setState({
        start: new Date().getTime(),
        elapsedTime: 0,
        started: false,
        paused: false
      });
    }, 100);

  }

  tickInterval () {
    if (this.state.elapsedTime >= this.state.remainingTime) { this.endTimer(); }

    this.setState({ elapsedTime: new Date().getTime() - this.state.start });
  }

  endTimer () {
    this.performAction("Stop");
    this.audio.play();
    this.props.timerFinished();
    this.resetTimer();
  }

  handleController (e) {
    e.preventDefault();

    const option = e.currentTarget.textContent;

    this.performAction(option);
  }

  performAction (option) {
    switch (option) {
      case "Start":
        if (this.props.klass === "pomodoro") { this.props.startToDo(); }
        this.setState({ start: new Date().getTime() + 800, started: true });
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

    let btnText, btnContrClass, btnSkipClass;

    if (this.props.disabled) {
      [btnContrClass, btnSkipClass] = ["timer-controller disabled", "timer-skip disabled"];
    } else {
      [btnContrClass, btnSkipClass] = ["timer-controller", "timer-skip"];
    }

    if (!this.state.started) {
      btnText = "Start";
    } else if (this.state.started && this.state.paused) {
      btnText = "Resume";
    } else {
      btnText = "Pause";
    }

    return (
      <div className={ klass }>
        <label className="timer-label">{ labelText }</label>

        <button className={ btnContrClass }
          onClick={ this.handleController }
          disabled={ this.props.disabled }>{ btnText }</button>

        <button className={ btnSkipClass }
          onClick={ this.endTimer }
          disabled={ this.props.disabled }>Skip</button>

        <label className="timer-countdown">{ timerText }</label>
      </div>
    );
  }
}

export default Timer;
