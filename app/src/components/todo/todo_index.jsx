import React from 'react';

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
    const toDoTitles = this.props.toDos.map( (toDo, idx) => <li key={ idx }>{ toDo.title }</li> );

    return (
      <ul className="to-do-index">
        { toDoTitles }
      </ul>
    );
  }
}

export default UserShowPage;
