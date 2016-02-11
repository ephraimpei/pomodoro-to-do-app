import React from 'react';
import ToDoIndex from '../todo/todo_index.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoStore from '../../stores/to_do_store.js';

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state={ toDos: this.getStateFromStore() };
  }

  componentWillMount () {
    ApiToDoUtil.fetch(this.props.routeParams.username);
  }

  componentDidMount () {
    ToDoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    ToDoStore.removeChangeListener(this._onChange);
  }

  getStateFromStore () {
    return ToDoStore.get();
  }

  _onChange () {
    this.setState({ toDos: this.getStateFromStore() });
  }

  render () {  
    return (
      <div className="user-show-page">
        <div className="to-do-list-wrapper">
          <ToDoIndex toDos={ this.state.toDos }/>
        </div>
      </div>
    );
  }
}

export default UserShowPage;
