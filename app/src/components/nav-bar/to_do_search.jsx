import React from 'react';
import $ from 'jquery';
import ToDoStore from '../../stores/to_do_store.js';

class ToDoSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleToDoSearchInput = this.handleToDoSearchInput.bind(this);
    this.handleToDoSearchAutoComplete = this.handleToDoSearchAutoComplete.bind(this);
    this.handleUserSearchSubmission = this.handleUserSearchSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.handleUserSearchInputFocus = this.handleUserSearchInputFocus.bind(this);
    this.addDOMListeners = this.addDOMListeners.bind(this);
    this.removeDOMListeners = this.removeDOMListeners.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.highlightUser = this.highlightUser.bind(this);
    this.unhighlightUser = this.unhighlightUser.bind(this);
    this.__onChange = this.__onChange.bind(this);
    this.state = { to_do: "", showToDoAutoCompleteList: false };
  }

  componentDidMount () {
    this.addDOMListeners();
    ToDoStore.addChangeListener(this.__onChange);
  }

  componentWillUnmount () {
    this.removeDOMListeners();
    ToDoStore.removeChangeListener(this.__onChange);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ to_do: "", showToDoAutoCompleteList: false });
  }

  addDOMListeners () {
    $("#content").on("click", (e) => {
      $(".selected").removeClass("selected");
      this.setState({showToDoAutoCompleteList: false});
    });

    $(".user-search-bar").on("click", (e) => e.stopPropagation() );
  }

  removeDOMListeners () {
    $("#content").off();
    $(".user-search-bar").off();
  }

  handleToDoSearchInput (e, mode) {
    const to_do = e.currentTarget.value || e.currentTarget.textContent;

    if (typeof mode === "undefined") { mode = "autocomplete-input"; }

    this.setState({ to_do });

    this.handleToDoSearchAutoComplete(username, mode);
  }

  handleToDoSearchAutoComplete (username, mode) {
    if (this.usernameInBounds(username)) {
      ApiUserUtil.fetchUsers(username, mode);
    } else {
      this.setState({ showToDoAutoCompleteList: false });
    }
  }

  handleUserSearchSubmission () {
    $(".user-search-submit").removeClass("pressed");
    this.props.successfulUserSearch(this.state.username);
  }

  selectUser (e) {
    this.handleToDoSearchInput(e, "autocomplete-selection");
  }

  handleKeyDown (e) {
    switch (e.keyCode) {
      // Enter
      case 13:
        if ($(".user-search-autocomplete-list-item.selected").length > 0) {
          $(".user-search-autocomplete-list-item.selected")[0].click();
        } else if ($(".user-search-bar").is(":focus")) {
          $(".user-search-submit").addClass("pressed");
          this.handleUserSearchSubmission();
        }
        break;
      // Arrow Up Key
      case 38:
        e.preventDefault();
        this.moveUp();
        break;
      // Arrow Down Key
      case 40:
        e.preventDefault();
        this.moveDown();
        break;
    }
  }

  moveUp () {
    if ($(".selected").prev(".user-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .prev(".user-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".user-search-autocomplete-list-item")
        .last()
        .addClass("selected")
        .focus();
    }
  }

  moveDown () {
    if ($(".selected").next(".user-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .next(".user-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".user-search-autocomplete-list-item")
        .first()
        .addClass("selected")
        .focus();
    }
  }

  highlightUser (e) {
    $(e.currentTarget).addClass("selected");
  }

  unhighlightUser (e) {
    $(e.currentTarget).removeClass("selected");
  }

  handleUserSearchInputFocus (e) {
    if (typeof e === "undefined") {
      this.setState({ showToDoAutoCompleteList: false });
    } else {
      if (this.usernameInBounds(this.state.username)) {
        this.setState({ showToDoAutoCompleteList: true });
      }
    }
  }

  __onChange () {
    this.setState({ showToDoAutoCompleteList: true });
  }

  render () {
    const users = userSearchAutoCompleteStore.get();

    const userSearchAutoCompleteItems = users.map( (user, idx) => {
      return <a key={ idx }
                className="user-search-autocomplete-list-item"
                onClick={ this.selectUser }
                onMouseOver={ this.highlightUser }
                onMouseOut={ this.unhighlightUser }>
                { user.username }
              </a>;
    });

    let userSearchAutoCompleteListClass = "user-search-autocomplete-list ";

    if (this.state.showToDoAutoCompleteList) {
      userSearchAutoCompleteListClass += "show";
    }

    return (
      <div className="user-search" onKeyDown={ this.handleKeyDown }>
        <label>Find User</label>

        <input className="user-search-bar"
          type="text"
          value={ this.state.username }
          placeholder="Search for username"
          onChange={ this.handleToDoSearchInput }
          onFocus={ this.handleUserSearchInputFocus }
          />

        <button className="user-search-submit"
          onClick={ this.handleUserSearchSubmission }>🔍</button>

        <div className={ userSearchAutoCompleteListClass }>
          { userSearchAutoCompleteItems }
        </div>
      </div>
     );
  }
}

export default ToDoSearch;
