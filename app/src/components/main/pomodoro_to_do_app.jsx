import React from 'react';

class PomodoroToDoApp extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render () {
    return (
        <div className="main-app">
          { this.props.children }
        </div>
     );
  }
}

export default PomodoroToDoApp;
