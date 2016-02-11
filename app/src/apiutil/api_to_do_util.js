import $ from 'jquery';
import ToDoActions from "../actions/to_do_actions.js";

class ApiToDoUtil {
  create (formData, username, success, failure, clearForm) {
    const receiveToDo = (data) => {
      ToDoActions.receiveToDo(data.to_do);
      success(data.message);
      clearForm();
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

  delete (username, toDoId) {
    const deleteToDo = (data) => {
      ToDoActions.deleteToDo(data.to_do);
    };

    $.ajax({
      url: `/user/${ username }/todo/${ toDoId }`,
      type: 'DELETE'
    }).done(deleteToDo)
;  }
}

const apiToDoUtil = new ApiToDoUtil();

export default apiToDoUtil;
