import React from 'react';
import ToDoIndex from '../todo/todo_index.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoStore from '../../stores/to_do_store.js';

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.toggleToDoForm = this.toggleToDoForm.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state={
      toDos: this.getStateFromStore(),
      displayToDoForm: false
     };
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

  toggleToDoForm (e) {
    e.preventDefault();

    newState = this.state.displayToDoForm ? false : true;

    this.setState({ displayToDoForm: newState });
  }

  _onChange () {
    this.setState({ toDos: this.getStateFromStore() });
  }

  render () {
    let buttonText;

    if (this.state.displayToDoForm) {
      buttonText = "Nevermind!";
    } else {
      buttonText = "Create To Do Item!";
    }

    return (
      <div className="user-show-page">
        <div className="to-do-list-wrapper">
          <button onClick={ this.toggleToDoForm }>{ buttonText }</button>
          <ToDoIndex toDos={ this.state.toDos }/>
        </div>
      </div>
    );
  }
}

export default UserShowPage;
