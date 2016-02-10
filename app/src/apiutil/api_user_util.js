import $ from 'jquery';
import CurrentUserActions from "../actions/current_user_actions.js";

class ApiUserUtil {
  create (formData, success, failure) {
    const receiveCurrentUser = (data) => {
      CurrentUserActions.receiveCurrentUser(data.user);
      success(data.message, data.user.username);
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: "/user",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData})
      .done(receiveCurrentUser)
      .fail(receiveError);
  }
}

const apiUserUtil = new ApiUserUtil();

export default apiUserUtil;
