import React from 'react';

class NotificationModal extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className="notification modal">
        <div className="notification">
          <label onClick>X</label>
          <label>{ this.props.message }</label>
        </div>

        <div className="modal-screen"></div>  
      </div>
    );
  }
}

export default NotificationModal;
