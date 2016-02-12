import React from 'react';
import $ from 'jquery';
import ToDoAutoCompleteStore from '../../stores/to_do_autocomplete_store.js';

class ToDoSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleToDoSearchInput = this.handleToDoSearchInput.bind(this);
    this.handleToDoSearchAutoComplete = this.handleToDoSearchAutoComplete.bind(this);
    this.handleToDoSearchSubmission = this.handleToDoSearchSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectToDo = this.selectToDo.bind(this);
    this.handleToDoSearchInputFocus = this.handleToDoSearchInputFocus.bind(this);
    this.addDOMListeners = this.addDOMListeners.bind(this);
    this.removeDOMListeners = this.removeDOMListeners.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.highlightToDo = this.highlightToDo.bind(this);
    this.unhighlightToDo = this.unhighlightToDo.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = { to_do: "", showToDoAutoComplete: false };
  }

  componentDidMount () {
    this.addDOMListeners();
    ToDoAutoCompleteStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    this.removeDOMListeners();
    ToDoAutoCompleteStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ to_do: "", showToDoAutoComplete: false });
  }

  addDOMListeners () {
    $("#content").on("click", (e) => {
      $(".selected").removeClass("selected");
      this.setState({showToDoAutoComplete: false});
    });

    $(".toDo-search-bar").on("click", (e) => e.stopPropagation() );
  }

  removeDOMListeners () {
    $("#content").off();
    $(".to-do-search-bar").off();
  }

  handleToDoSearchInput (e, mode) {
    const to_do = e.currentTarget.value || e.currentTarget.textContent;

    if (typeof mode === "undefined") { mode = "autocomplete-input"; }

    this.setState({ to_do });

    this.handleToDoSearchAutoComplete(toDoTitle, mode);
  }

  handleToDoSearchAutoComplete (toDoTitle, mode) {
    if (this.toDonameInBounds(toDoname)) {
      ApiSearchUtil.fetchToDos(toDoname, mode);
    } else {
      this.setState({ showToDoAutoComplete: false });
    }
  }

  handleToDoSearchSubmission () {
    $(".to-do-search-submit").removeClass("pressed");
    this.props.successfulToDoSearch(this.state.toDoname);
  }

  selectToDo (e) {
    this.handleToDoSearchInput(e, "autocomplete-selection");
  }

  handleKeyDown (e) {
    switch (e.keyCode) {
      // Enter
      case 13:
        if ($(".to-do-search-autocomplete-list-item.selected").length > 0) {
          $(".to-do-search-autocomplete-list-item.selected")[0].click();
        } else if ($(".toDo-search-bar").is(":focus")) {
          $(".to-do-search-submit").addClass("pressed");
          this.handleToDoSearchSubmission();
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
    if ($(".selected").prev(".to-do-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .prev(".to-do-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".to-do-search-autocomplete-list-item")
        .last()
        .addClass("selected")
        .focus();
    }
  }

  moveDown () {
    if ($(".selected").next(".to-do-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .next(".toDo-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".to-do-search-autocomplete-list-item")
        .first()
        .addClass("selected")
        .focus();
    }
  }

  highlightToDo (e) {
    $(e.currentTarget).addClass("selected");
  }

  unhighlightToDo (e) {
    $(e.currentTarget).removeClass("selected");
  }

  handleToDoSearchInputFocus (e) {
    if (typeof e === "undefined") {
      this.setState({ showToDoAutoComplete: false });
    } else {
      if (this.toDonameInBounds(this.state.toDoname)) {
        this.setState({ showToDoAutoComplete: true });
      }
    }
  }

  _onChange () {
    this.setState({ showToDoAutoComplete: true });
  }

  render () {
    const toDos = ToDoAutoCompleteStore.get();

    const toDoAutoCompleteLinks = toDos.map( (toDo, idx) => {
      return <a key={ idx }
                className="to-do-autocomplete-item"
                onClick={ this.selectToDo }
                onMouseOver={ this.highlightToDo }
                onMouseOut={ this.unhighlightToDo }>
                { toDo.title }
              </a>;
            });

    let toDoAutoCompleteClass = "to-do-search-autocomplete-list ";

    if (this.state.showToDoAutoComplete) {
      toDoAutoCompleteClass += "show";
    }

    return (
      <div className="to-do-search" onKeyDown={ this.handleKeyDown }>
        <label>Find to do item</label>

        <input className="to-do-search-bar"
          type="text"
          value={ this.state.toDoname }
          placeholder="Search for to do title"
          onChange={ this.handleToDoSearchInput }
          onFocus={ this.handleToDoSearchInputFocus }
          />

        <button className="to-do-search-submit"
          onClick={ this.handleToDoSearchSubmission }>🔍</button>

        <div className={ toDoAutoCompleteClass }>
          { toDoAutoCompleteLinks }
        </div>
      </div>
     );
  }
}

export default ToDoSearch;
