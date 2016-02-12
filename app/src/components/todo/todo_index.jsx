import React from 'react';
import ToDoIndexItem from './todo_index_item.jsx';

class ToDoIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const toDos = this.props.toDos.map( (toDo, idx) => {
      return <ToDoIndexItem key={ idx }
        idx={ idx + 1 }
        attr={ toDo }
        username={ this.props.username }
        goToShowPage={ this.props.goToShowPage }/>;
    });

    return (
      <ul className="to-do-index">
        { toDos }
      </ul>
    );
  }
}

export default ToDoIndex;
