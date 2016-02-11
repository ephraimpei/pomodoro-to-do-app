import React from 'react';

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleToDoSubmssion = this.handleToDoSubmssion.bind(this);
    this.state={
      title: "",
      description: "",
      numPomodoros: 0
     };
  }

  handleToDoSubmssion (e) {

  }

  render () {
    const klass = this.props.visible ? "to-do-form visible" : "to-do-form";

    return (
      <form className={ klass } onSubmit={ this.handleToDoSubmssion }>
        <label>Title</label>
        <input className="title-input" type="text" onChange={ this.changeTitle }/>

        <label>Description</label>
        <textarea className="description-textbox" onChange={ this.changeDescription }/>

        <button className="submit" type="submit">Submit</button>
      </form>
    );
  }
}

export default ToDoForm;
