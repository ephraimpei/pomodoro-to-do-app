import $ from 'jquery';
import ToDoActions from "../actions/to_do_actions.js";

class ApiSearchUtil {
  searchToDos (username, title) {
    const receiveToDos = (data) => ToDoActions.receiveToDos(data.to_dos);
    const query = `title=${ title }`;

    $.get(`/user/${ username }/todos/search?${ query }`).done(receiveToDos);
  }
}

const apiSearchUtil = new ApiSearchUtil();

export default apiSearchUtil;
