import React from 'react';
import PomodoroIndexItem from './pomodoro_index_item.jsx';

class PomodoroIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const pomodoros = this.props.pomodoros.map( (pomodoro, idx) => {
      return <PomodoroIndexItem key={ idx } attr={ pomodoro }/>;
    });

    return (
      <div className="pomodoro-index">
        { pomodoros }
      </div>
    );
  }
}

export default PomodoroIndex;
