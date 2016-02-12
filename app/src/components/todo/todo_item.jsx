import React from 'react';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoForm from './todo_form.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class ToDoItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteToDoItem = this.deleteToDoItem.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = {
      complete: this.props.attr.complete,
      showDetails: false,
      showEditForm: false
     };
  }

  deleteToDoItem (e) {
    e.preventDefault();

    ApiToDoUtil.delete(this.props.username, this.props.attr.id.$oid, displayFlashMessage);
  }

  toggleEditForm (e) {
    e.preventDefault();

    const newState = this.state.showEditForm ? false : true;

    this.setState({ showEditForm: newState });
  }

  hideForm () {
    this.setState({ showEditForm: false });
  }

  render () {
    const buttonText = this.state.showEditForm ? "Cancel" : "Edit";

    return (
      <li className="to-do-item">
        <label>#{ this.props.id }</label>

        <label>Complete?
          <input type="checkbox"
            id="complete"
            checked={ this.state.complete }
            disabled/></label>

        <label>{ this.props.attr.title }</label>

        <button className="show-to-do-details">▼</button>

        <button className="edit-to-do-item"
          onClick={ this.toggleEditForm }>{ buttonText }</button>

        <button className="delete-to-do-item"
          onClick={ this.deleteToDoItem }>Delete</button>

        <ToDoForm mode={ "edit" }
          visible={ this.state.showEditForm }
          username={ this.props.username }
          hideForm={ this.hideForm }
          attr={ this.props.attr }/>
      </li>
    );
  }
}

export default ToDoItem;
