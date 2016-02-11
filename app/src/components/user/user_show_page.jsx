import React from 'react';
import ToDoIndex from '../todo/todo_index.jsx';
import ToDoForm from '../todo/todo_form.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoStore from '../../stores/to_do_store.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import { failedToDoErrors } from '../../utilities/to_do.js';

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.toggleToDoForm = this.toggleToDoForm.bind(this);
    this.successfulToDoCreation = this.successfulToDoCreation.bind(this);
    this.failedToDoCreation = this.failedToDoCreation.bind(this);
    this.deleteToDoTitleErrors = this.deleteToDoTitleErrors.bind(this);
    this.deleteToDoDescriptionErrors = this.deleteToDoDescriptionErrors.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state={
      toDos: this.getStateFromStore(),
      displayToDoForm: false,
      toDoTitleErrors: [],
      toDoDescriptionErrors: []
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

    const newState = this.state.displayToDoForm ? false : true;

    this.setState({ displayToDoForm: newState });
  }

  successfulToDoCreation (message) {
    displayFlashMessage(message);
  }

  failedToDoCreation (errors) {
    const [toDoTitleErrors, toDoDescriptionErrors] = failedToDoErrors(errors);

    this.setState({ toDoTitleErrors, toDoDescriptionErrors });
  }

  deleteToDoTitleErrors () {
    this.setState({ toDoTitleErrors: [] });
  }

  deleteToDoDescriptionErrors () {
    this.setState({ toDoDescriptionErrors: [] });
  }

  _onChange () {
    this.setState({ toDos: this.getStateFromStore() });
  }

  render () {
    const buttonText = this.state.displayToDoForm ? "Nevermind!" : "Create To Do Item!";

    return (
      <div className="user-show-page">
        <div className="to-do-list-wrapper">
          <button className="toggle-to-do-form" onClick={ this.toggleToDoForm }>{ buttonText }</button>

          <ToDoForm visible={ this.state.displayToDoForm }
            username={ this.props.routeParams.username }
            success={ this.successfulToDoCreation }
            failure={ this.failedToDoCreation }
            toDoTitleErrors={ this.state.toDoTitleErrors }
            toDoDescriptionErrors={ this.state.toDoDescriptionErrors }
            deleteToDoTitleErrors={ this.deleteToDoTitleErrors }
            deleteToDoDescriptionErrors={ this.deleteToDoDescriptionErrors }/>

          <ToDoIndex toDos={ this.state.toDos }
            username={ this.props.routeParams.username }/>
        </div>
      </div>
    );
  }
}

export default UserShowPage;
