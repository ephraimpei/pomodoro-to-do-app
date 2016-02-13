import React from 'react';
import ToDoIndex from '../todo/todo_index.jsx';
import ToDoForm from '../todo/todo_form.jsx';
import ApiToDoUtil from '../../apiutil/api_to_do_util.js';
import ToDoStore from '../../stores/to_do_store.js';
import CurrentUserStore from '../../stores/current_user_store.js';

class UserShowPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.toggleToDoForm = this.toggleToDoForm.bind(this);
    this.goToToDoShowPage = this.goToToDoShowPage.bind(this);
    this._onChange = this._onChange.bind(this);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this.state={
      toDos: this.getStateFromStore(),
      displayToDoForm: false
     };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    ApiToDoUtil.fetch(this.props.routeParams.username);
  }

  componentDidMount () {
    ToDoStore.addChangeListener(this._onChange);
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
  }

  componentWillUnmount () {
    ToDoStore.removeChangeListener(this._onChange);
    CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  }

  getStateFromStore () {
    return ToDoStore.get();
  }

  toggleToDoForm (e) {
    e.preventDefault();

    const newState = this.state.displayToDoForm ? false : true;

    this.setState({ displayToDoForm: newState });
  }

  goToToDoShowPage (e) {
    const id = e.currentTarget.dataset.id;
    const toDo = ToDoStore.findById(id);

    this.context.router.push({
      pathname: `/user/${ CurrentUserStore.get().username }/todo/${ id }`,
      state: { toDo }
    })
  }

  _onChange () {
    this.setState({ toDos: this.getStateFromStore() });
  }

  _ensureLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) { this.context.router.push('/'); }
  }

  render () {
    const buttonText = this.state.displayToDoForm ? "Nevermind!" : "Create To Do Item!";
    const headerLabel = `${ CurrentUserStore.get().username }'s To Do List`;

    return (
      <div className="user-show-page">
        <label className="logged-in">Logged in as: { CurrentUserStore.get().username }</label>

        <div className="to-do-list-wrapper">
          <label className="to-do-header-label">{ headerLabel }</label>

          <button className="toggle-to-do-form"
            onClick={ this.toggleToDoForm }>{ buttonText }</button>

          <ToDoForm mode={ "new" }
            visible={ this.state.displayToDoForm }
            username={ this.props.routeParams.username }/>

          <ToDoIndex toDos={ this.state.toDos }
            username={ this.props.routeParams.username }
            goToShowPage={ this.goToToDoShowPage }/>
        </div>
      </div>
    );
  }
}

export default UserShowPage;
