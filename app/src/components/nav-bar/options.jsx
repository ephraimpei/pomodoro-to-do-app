import React from 'react';
import ApiSessionUtil from '../../apiutil/api_session_util.js';
import { displayFlashMessage } from '../../utilities/flash.js';

class Options extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
  }

  logoutCurrentUser (e) {
    e.preventDefault();

    ApiSessionUtil.logout(displayFlashMessage);
  }

  render () {
    const options = ["Logout"];

    const optionListItems = options.map( (option, idx) => <li key={ idx }>{ option }</li> );

    return (
      <div className="options">Options
        <ul className="options-list">
          { optionListItems }
        </ul>
      </div>
     );
  }
}

export default Options;
