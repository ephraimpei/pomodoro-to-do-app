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

  render () {
    const buttonText = this.state.showEditForm ? "Cancel" : "Edit";

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

        <button className="show-to-do-details">▼</button>

        <button className="show-to-do-item"
          data-id={ this.props.attr._id.$oid }
          onClick={ this.props.goToShowPage }>Show</button>

        <button className="edit-to-do-item"
          onClick={ this.toggleEditForm }>{ buttonText }</button>

        <button className="delete-to-do-item"
          onClick={ this.deleteToDoItem }>Delete</button>

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
