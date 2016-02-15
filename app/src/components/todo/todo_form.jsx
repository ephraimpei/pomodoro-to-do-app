import React from 'react';
import $ from 'jquery';
import Rcslider from 'rc-slider';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import { removeInvalidClass } from '../../utilities/auth.js';
import { failedToDoErrors } from '../../utilities/to_do.js';

class ToDoForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToDoSubmssion = this.handleToDoSubmssion.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.removePomodoro = this.removePomodoro.bind(this);
    this.addPomodoro = this.addPomodoro.bind(this);
    this.changePomodoroLength = this.changePomodoroLength.bind(this);
    this.changeBreakLength = this.changeBreakLength.bind(this);
    this.changeLongBreakLength = this.changeLongBreakLength.bind(this);
    this.success = this.success.bind(this);
    this.failure = this.failure.bind(this);
    this.deleteTitleErrors = this.deleteTitleErrors.bind(this);
    this.deleteDescriptionErrors = this.deleteDescriptionErrors.bind(this);
    this.determineInitialState = this.determineInitialState.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.state=this.determineInitialState();
  }

  determineInitialState () {
    if (this.props.mode === "new") {
      return {
        title: "",
        description: "",
        numPomodoros: 1,
        pomodoroLength: 25,
        breakLength: 5,
        longBreakLength: 15,
        toDoTitleErrors: [],
        toDoDescriptionErrors: []
      };
    } else if (this.props.mode === "edit") {
      return {
        title: this.props.attr.title,
        description: this.props.attr.description,
        numPomodoros: this.props.attr.pomodoros.length,
        pomodoroLength: this.props.attr.pomodoro_length,
        breakLength: this.props.attr.break_length,
        longBreakLength: this.props.attr.long_break_length,
        toDoTitleErrors: [],
        toDoDescriptionErrors: []
      };
    }

  }

  componentWillReceiveProps(nextProps) {
    // only update if receiving props from a different ToDo
    if (this.props.mode === "edit" && this.props.attr._id.$oid !== nextProps.attr._id.$oid) {
      this.setState({
        title: nextProps.attr.title,
        description: nextProps.attr.description,
        numPomodoros: nextProps.attr.pomodoros.length,
        pomodoroLength: nextProps.attr.pomodoro_length,
        breakLength: nextProps.attr.break_length,
        longBreakLength: nextProps.attr.long_break_length,
        toDoTitleErrors: [],
        toDoDescriptionErrors: []
      });
    }
  }

  handleToDoSubmssion (e) {
    if (e) { e.preventDefault(); }

    $("to-do-form.submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("num_pomodoros", this.state.numPomodoros);
    formData.append("pomodoro_length", this.state.pomodoroLength);
    formData.append("break_length", this.state.breakLength);
    formData.append("long_break_length", this.state.longBreakLength);

    if (this.props.mode === "new") {
      ApiToDoUtil.create(formData,
        this.props.username,
        this.success,
        this.failure,
        this.clearForm);
    } else if (this.props.mode === "edit") {
      ApiToDoUtil.update(formData,
        this.props.username,
        this.props.attr._id.$oid,
        this.success,
        this.failure,
        this.props.hideForm);
    }

  }

  changeTitle (e) {
    removeInvalidClass("title-input");

    this.deleteTitleErrors();

    this.setState({ title: e.currentTarget.value });
  }

  changeDescription (e) {
    removeInvalidClass("description-textbox");

    this.deleteDescriptionErrors();

    this.setState({ description: e.currentTarget.value });
  }

  clearForm (e) {
    if (e) { e.preventDefault(); }

    $(".title-input").val('');
    $(".description-textbox").val('');

    this.resetErrors();

    this.setState({ title: "",
      description: "",
      numPomodoros: 1,
      pomodoroLength: 25,
      breakLength: 5,
      longBreakLength: 15
    });
  }

  resetErrors () {
    removeInvalidClass("title-input");
    removeInvalidClass("description-textbox");

    this.deleteTitleErrors();
    this.deleteDescriptionErrors();
  }

  resetForm (e) {
    e.preventDefault();

    this.resetErrors();

    this.setState({
      title: this.props.attr.title,
      description: this.props.attr.description,
      numPomodoros: this.props.attr.pomodoros.length,
      pomodoroLength: this.props.attr.pomodoro_length,
      breakLength: this.props.attr.break_length,
      longBreakLength: this.props.attr.long_break_length
    });
  }

  removePomodoro (e) {
    e.preventDefault();

    const updatedPomodoroCount = this.state.numPomodoros - 1;

    if (updatedPomodoroCount >= 1) {
      this.setState({ numPomodoros: updatedPomodoroCount });
    }
  }

  addPomodoro (e) {
    e.preventDefault();

    const updatedPomodoroCount = this.state.numPomodoros + 1;

    if (updatedPomodoroCount <= 50) {
      this.setState({ numPomodoros: updatedPomodoroCount });
    }
  }

  changePomodoroLength (e) {
    this.setState({ pomodoroLength: e });
  }

  changeBreakLength (e) {
    this.setState({ breakLength: e });
  }

  changeLongBreakLength (e) {
    this.setState({ longBreakLength: e });
  }

  success (message) {
    displayFlashMessage(message);
  }

  failure (errors) {
    const [toDoTitleErrors, toDoDescriptionErrors] = failedToDoErrors(errors);

    this.setState({ toDoTitleErrors, toDoDescriptionErrors });
  }

  deleteTitleErrors () {
    this.setState({ toDoTitleErrors: [] });
  }

  deleteDescriptionErrors () {
    this.setState({ toDoDescriptionErrors: [] });
  }

  render () {
    const klass = this.props.visible ? "to-do-form visible" : "to-do-form";

    const titleErrors = this.state.toDoTitleErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const descriptionErrors = this.state.toDoDescriptionErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const pomodoroLengthSlider = (
      <Rcslider min={ 1 } max={ 60 } step={ 1 } className="slider pomodoro-length"
        value={ this.state.pomodoroLength }
        onChange={ this.changePomodoroLength }/>
    );

    const breakLengthSlider = (
      <Rcslider min={ 1 } max={ 60 } step={ 1 } className="slider break-length"
        value={ this.state.breakLength }
        onChange={ this.changeBreakLength }/>
    );

    const longBreakLengthSlider = (
      <Rcslider min={ 1 } max={ 60 } step={ 1 } className="slider long-break-length"
        value={ this.state.longBreakLength }
        onChange={ this.changeLongBreakLength }/>
    );

    const resetButton = this.props.mode === "edit" ?
      <button className="reset" onClick={ this.resetForm }>Reset</button> : "";

    return (
      <form className={ klass } onSubmit={ this.handleToDoSubmssion }>
        <label>Title</label>
        <ul className="form-error-wrapper">{ titleErrors }</ul>
        <input className="title-input"
          type="text"
          onChange={ this.changeTitle }
          value={ this.state.title }/>

        <label>Description</label>
        <ul className="form-error-wrapper">{ descriptionErrors }</ul>
        <textarea className="description-textbox"
          onChange={ this.changeDescription }
          value={ this.state.description }/>

        <label>Pomodoros: { this.state.numPomodoros }</label>
        <div className="pomodoro-counter-wrapper">
          <button className="remove-pomodoro" onClick={ this.removePomodoro }>−</button>
          <img src="/images/logo/pomodoro.png"/>
          <button className="add-pomodoro" onClick={ this.addPomodoro }>+</button>
        </div>

        <label>Pomodoro: { this.state.pomodoroLength } minutes</label>
        { pomodoroLengthSlider }

        <label>Break: { this.state.breakLength } minutes</label>
        { breakLengthSlider }

        <label>Long Break: { this.state.longBreakLength } minutes</label>
        { longBreakLengthSlider }

        <div className="to-do-form-options">
          <button className="submit" type="submit">Submit</button>
          { resetButton }
          <button className="clear" onClick={ this.clearForm }>Clear</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
