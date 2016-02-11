import React from 'react';
import ToDoIndex from '../todo/todo_index.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.jsx';

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state={ to_dos: this.getStateFromStore() };
  }

  componentWillMount () {
    debugger;
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  getStateFromStore () {

  }

  _onChange () {
    this.setState({ to_dos: this.getStateFromStore() });
  }

  render () {
    return (
      <div className="user-show-page">
        <div className="todo-list-wrapper">
          <ToDoIndex to_dos={ this.state.to_dos }/>
        </div>
      </div>
    );
  }
}

export default UserShowPage;
