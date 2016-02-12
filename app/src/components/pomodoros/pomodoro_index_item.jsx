import React from 'react';

class PomodoroIndexItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    let imgUrl;

    switch (this.props.attr.status) {
      case "not_started":
        imgUrl = "/images/pomodoros/not_started_pomodoro.png";
        break;
      case "in_progress":
        imgUrl = "/images/pomodoros/in_progress_pomodoro.png";
        break;
      case "complete":
        imgUrl = "/images/pomodoros/complete_pomodoro.png";
        break;
    }

    return (
      <div className="pomodoro-index-item">
        <img className="pomodoro-index-item-img" src={ imgUrl }/>
      </div>
    );
  }
}

export default PomodoroIndexItem;
