import AppDispatcher from '../dispatcher/dispatcher.js';
import SearchConstants from "../constants/search_constants.js";

export default new class {
  receiveToDos (toDos) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_TO_DOS,
      toDos: toDos
    });
  }
}();
