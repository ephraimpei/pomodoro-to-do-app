import React from 'react';
import ApiToDoUtil from '../../apiutil/api_to_do_util';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: this.props.attr.complete,
      showDetails: false
     };
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
      </li>
    );
  }
}

export default ToDoItem;
