import $ from 'jquery';
import ToDoActions from "../actions/to_do_actions.js";

class ApiToDoUtil {
  create (formData, username, success, failure, optCallback) {
    const receiveToDo = (data) => {
      ToDoActions.receiveToDo(data.to_do);
      success(data.message);
      optCallback && optCallback();
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

  fetch (username) {
    const receiveToDos = (data) => ToDoActions.receiveToDos(data.to_dos);

    $.get(`/user/${ username }/todo`).done(receiveToDos);
  }
}

const apiToDoUtil = new ApiToDoUtil();

export default apiToDoUtil;
