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
    this.state={ title: "",
      description: "",
      pomodoros: 0,
      pomodoroLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15
    };
  }

  handleToDoSubmssion (e) {
    if (e) { e.preventDefault(); }

    $("to-do-form.submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("description", this.state.description);

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

    this.setState({ title: "", description: "", numPomodoros: 0 });
  }

  removePomodoro (e) {
    e.preventDefault();

    const updatedPomodoroCount = this.state.pomodoros - 1;

    if (updatedPomodoroCount >= 0) {
      this.setState({ pomodoros: updatedPomodoroCount });
    }
  }

  addPomodoro (e) {
    e.preventDefault();

    const updatedPomodoroCount = this.state.pomodoros + 1;

    this.setState({ pomodoros: updatedPomodoroCount });
  }

  render () {
    const klass = this.props.visible ? "to-do-form visible" : "to-do-form";

    const titleErrors = this.props.toDoTitleErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    const descriptionErrors = this.props.toDoDescriptionErrors.map( (err, idx) =>
      <li key={ idx }>{ err }</li>
    );

    return (
      <form className={ klass } onSubmit={ this.handleToDoSubmssion }>
        <label>Title</label>
        <ul className="form-error-wrapper">{ titleErrors }</ul>
        <input className="title-input" type="text" onChange={ this.changeTitle }/>

        <label>Description</label>
        <ul className="form-error-wrapper">{ descriptionErrors }</ul>
        <textarea className="description-textbox" onChange={ this.changeDescription }/>

        <label>Pomodoros: { this.state.pomodoros }</label>
        <div className="pomodoro-counter-wrapper">
          <button className="remove-pomodoro" onClick={ this.removePomodoro }>−</button>
          <img src="/images/pomodoro.png"/>
          <button className="add-pomodoro" onClick={ this.addPomodoro }>+</button>
        </div>

        <label>Settings (minutes)</label>
        <label>Pomodoro: { this.state.pomodoroLength }</label>
        <Rcslider min={ 0 } max={ 60 } defaultValue={ 25 } step={ 1 } />

        <label>Break: { this.state.shortBreakLength }</label>
        <Rcslider min={ 0 } max={ 60 } defaultValue={ 25 } step={ 1 } />

        <label>Long Break: { this.state.longBreakLength }</label>
        <Rcslider min={ 0 } max={ 60 } defaultValue={ 25 } step={ 1 } />

        <div className="to-do-form-options">
          <button className="submit" type="submit">Submit</button>
          <button className="clear" onClick={ this.clearForm }>Clear</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
