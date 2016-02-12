import React from 'react';
import $ from 'jquery';
import ApiSearchUtil from '../../apiutil/api_search_util.js';

class ToDoSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeSearchInput = this.changeSearchInput.bind(this);
    this.state = { title: "" };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ title: "" });
  }

  handleSearchSubmission (title) {
    $(".to-do-search-submit").removeClass("pressed");

    ApiSearchUtil.searchToDos(this.props.username, title);
  }

  handleKeyDown (e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.handleSearchSubmission(this.state.title);
    }
  }

  changeSearchInput (e) {
    const title = e.currentTarget.value;

    this.handleSearchSubmission(title);

    this.setState({ title });
  }

  render () {
    return (
      <div className="to-do-search" onKeyDown={ this.handleKeyDown }>
        <label>Find</label>

        <input className="to-do-search-bar"
          type="text"
          value={ this.state.title }
          placeholder="Search to do items by title"
          onChange={ this.changeSearchInput }/>

        <button className="to-do-search-submit"
          onClick={ this.handleSearchSubmission }>🔍</button>
      </div>
     );
  }
}

export default ToDoSearch;
