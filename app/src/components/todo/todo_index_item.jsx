import React from 'react';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoForm from './todo_form.jsx';
import PomodoroIndex from '../pomodoros/pomodoro_index.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class ToDoItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteToDoItem = this.deleteToDoItem.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.state = {
      complete: this.props.attr.complete,
      showDetails: false,
      showEditForm: false
     };
  }

  deleteToDoItem (e) {
    e.preventDefault();

    ApiToDoUtil.delete(this.props.username, this.props.attr._id.$oid, displayFlashMessage);
  }

  toggleEditForm (e) {
    e.preventDefault();

    const newState = this.state.showEditForm ? false : true;

    this.setState({ showEditForm: newState });
  }

  hideForm () {
    this.setState({ showEditForm: false });
  }

  showDetails (e) {
    e.preventDefault();

    const showDetails = !this.state.showDetails;

    this.setState({ showDetails });
  }

  render () {
    const buttonText = this.state.showEditForm ? "Cancel" : "Edit";

    const detailView = this.state.showDetails ? (
        <div className="to-do-index-item-details">
          <textarea className="to-do-index-item-description"
            value={ this.props.attr.description }
            disabled/>

          <PomodoroIndex pomodoros={ this.props.attr.pomodoros } />
        </div>
      ) : "";

    return (
      <div className="to-do-index-item">
        <label className="to-do-id">#{ this.props.idx }</label>

        <label className="to-do-index-item-complete">Complete?
          <input type="checkbox"
            id="complete"
            checked={ this.state.complete }
            disabled/></label>

        <label className="to-do-title-index-item"
          data-id={ this.props.attr._id.$oid }
          onClick={ this.props.goToShowPage }>{ this.props.attr.title }</label>

        <div className="to-do-index-item-buttons-wrapper">
          <button className="show-to-do-details"
            onClick={ this.showDetails }>▼</button>
          
          <button className="show-to-do-item"
            data-id={ this.props.attr._id.$oid }
            onClick={ this.props.goToShowPage }>Show</button>

          <button className="edit-to-do-item"
            onClick={ this.toggleEditForm }>{ buttonText }</button>

          <button className="delete-to-do-item"
            onClick={ this.deleteToDoItem }>Delete</button>
        </div>

        { detailView }

        <ToDoForm mode={ "edit" }
          visible={ this.state.showEditForm }
          username={ this.props.username }
          hideForm={ this.hideForm }
          attr={ this.props.attr }/>
      </div>
    );
  }
}

export default ToDoItem;
