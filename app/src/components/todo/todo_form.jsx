import React from 'react';
import $ from 'jquery';
import Rcslider from 'rc-slider';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import { removeInvalidClass } from '../../utilities/auth.js';

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleToDoSubmssion = this.handleToDoSubmssion.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.removePomodoro = this.removePomodoro.bind(this);
    this.addPomodoro = this.addPomodoro.bind(this);
    this.changePomodoroLength = this.changePomodoroLength.bind(this);
    this.changeBreakLength = this.changeBreakLength.bind(this);
    this.changeLongBreakLength = this.changeLongBreakLength.bind(this);
    this.state={ title: "",
      description: "",
      numPomodoros: 1,
      pomodoroLength: 25,
      breakLength: 5,
      longBreakLength: 15
    };
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

    ApiToDoUtil.create(formData, this.props.username, this.props.success, this.props.failure, this.clearForm);
  }

  changeTitle (e) {
    removeInvalidClass("title-input");

    this.props.deleteToDoTitleErrors();

    this.setState({ title: e.currentTarget.value });
  }

  changeDescription (e) {
    removeInvalidClass("description-textbox");

    this.props.deleteToDoDescriptionErrors();

    this.setState({ description: e.currentTarget.value });
  }

  clearForm (e) {
    if (e) { e.preventDefault(); }

    $(".title-input").val('');
    $(".description-textbox").val('');

    removeInvalidClass("title-input");
    removeInvalidClass("description-textbox");

    this.props.deleteToDoTitleErrors();
    this.props.deleteToDoDescriptionErrors();

    this.setState({ title: "",
      description: "",
      numPomodoros: 1,
      pomodoroLength: 25,
      breakLength: 5,
      longBreakLength: 15
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

  render () {
    const klass = this.props.visible ? "to-do-form visible" : "to-do-form";

    const titleErrors = this.props.toDoTitleErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const descriptionErrors = this.props.toDoDescriptionErrors.map( (err, idx) =>
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

    return (
      <form className={ klass } onSubmit={ this.handleToDoSubmssion }>
        <label>Title</label>
        <ul className="form-error-wrapper">{ titleErrors }</ul>
        <input className="title-input" type="text" onChange={ this.changeTitle }/>

        <label>Description</label>
        <ul className="form-error-wrapper">{ descriptionErrors }</ul>
        <textarea className="description-textbox" onChange={ this.changeDescription }/>

        <label>Pomodoros: { this.state.numPomodoros }</label>
        <div className="pomodoro-counter-wrapper">
          <button className="remove-pomodoro" onClick={ this.removePomodoro }>−</button>
          <img src="/images/pomodoro.png"/>
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
          <button className="clear" onClick={ this.clearForm }>Clear</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
