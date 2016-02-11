import $ from 'jquery';
import CurrentUserActions from "../actions/current_user_actions.js";

class ApiSessionUtil {
  login(formData, success, failure) {
    const receiveCurrentUser = (data) => {
      CurrentUserActions.receiveCurrentUser(data.user);
      success(data.message, data.user.username);
    };

    const receiveErrors = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: "/session",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData
    }).done(receiveCurrentUser).fail(receiveErrors);
  }
}

const apiSessionUtil = new ApiSessionUtil();

export default apiSessionUtil;
