import $ from 'jquery';
import ToDoActions from "../actions/to_do_actions.js";

class ApiToDoUtil {
  create (formData, username, success, failure) {
    const receiveToDo = (data) => {
      ToDoActions.receiveToDo(data.to_do);
      success(data.message);
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: `/user/${ username }/todo`,
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData})
      .done(receiveToDo)
      .fail(receiveError);
  }

  fetch (username, success, failure) {
    const receiveToDos = (data) => {
      ToDoActions.receiveToDos(data.to_dos);
      success(data.message);
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.get(`/user/${ username }/todo`)
      .done(receiveToDos)
      .fail(receiveError);
  }
}

const apiToDoUtil = new ApiToDoUtil();

export default apiToDoUtil;
