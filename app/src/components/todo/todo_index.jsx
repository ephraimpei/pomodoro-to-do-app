import React from 'react';
import ToDoItem from './todo_item.jsx';

class ToDoIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const toDos = this.props.toDos.map( (toDo, idx) => {
      return <ToDoItem key={ idx }
        id={ idx + 1 }
        attr={ toDo }
        username={ this.props.username }/>;
    });

    return (
      <ul className="to-do-index">
        { toDos }
      </ul>
    );
  }
}

export default ToDoIndex;
