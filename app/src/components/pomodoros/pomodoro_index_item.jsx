import React from 'react';

class PomodoroIndexItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const imgUrl = this.props.attr.complete ?
      "/images/pomodoros/complete_pomodoro.png" :
      "/images/pomodoros/incomplete_pomodoro.png";

    return (
      <div className="pomodoro-index-item">
        <img className="pomodoro-index-item-img" src={ imgUrl }/>
      </div>
    );
  }
}

export default PomodoroIndexItem;
