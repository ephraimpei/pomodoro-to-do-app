import React from 'react';
import $ from 'jquery';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import { removeInvalidClass } from '../../utilities/auth.js';

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleToDoSubmssion = this.handleToDoSubmssion.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state={ title: "", description: "", numPomodoros: 0 };
  }

  handleToDoSubmssion (e) {
    if (e) { e.preventDefault(); }

    $("to-do-form.submit").addClass("disabled").prop("disabled", true);

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("description", this.state.description);

    ApiToDoUtil.create(formData, this.props.username, this.props.success, this.props.failure, this.clearForm());
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

        <div className="to-do-form-options">
          <button className="submit" type="submit">Submit</button>
          <button className="clear" onClick={ this.clearForm }>Clear</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
