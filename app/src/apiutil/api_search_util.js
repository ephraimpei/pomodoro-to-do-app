import $ from 'jquery';
import SearchActions from "../actions/search_actions.js";

class ApiSearchUtil {
  searchToDos (username, title) {
    const receiveToDos = (data) => SearchActions.receiveToDos(data.to_dos);
    const query = `title=%${ title }`;

    $.get(`/user/${ username }/todos/search?${ query }`, title).done(receiveToDos);
  }
}

const apiSearchUtil = new ApiSearchUtil();

export default apiSearchUtil;
