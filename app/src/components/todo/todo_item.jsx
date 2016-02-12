import React from 'react';
import ApiToDoUtil from '../../apiutil/api_to_do_util';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteToDoItem = this.deleteToDoItem.bind(this);
    this.state = {
      complete: this.props.attr.complete,
      showDetails: false
     };
  }

  deleteToDoItem (e) {
    e.preventDefault();

    ApiToDoUtil.delete(this.props.username, this.props.attr.id.$oid);
  }

  render () {
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

        <button className="delete-to-do-item"
          onClick={ this.deleteToDoItem }>Delete</button>
      </li>
    );
  }
}

export default ToDoItem;
