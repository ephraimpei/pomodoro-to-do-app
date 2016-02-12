import AppDispatcher from '../dispatcher/dispatcher.js';
import ToDoConstants from "../constants/to_do_constants.js";

export default new class {
  receiveToDos (toDos) {
    AppDispatcher.dispatch({
      actionType: ToDoConstants.RECEIVE_TO_DOS,
      toDos: toDos
    });
  }

  receiveToDo (toDo) {
    AppDispatcher.dispatch({
      actionType: ToDoConstants.RECEIVE_TO_DO,
      toDo: toDo
    });
  }

  deleteToDo (toDo) {
    AppDispatcher.dispatch({
      actionType: ToDoConstants.DELETE_TO_DO,
      toDo: toDo
    });
  }

  updateToDo (toDo) {
    AppDispatcher.dispatch({
      actionType: ToDoConstants.UPDATE_TO_DO,
      toDo: toDo
    });
  }
}();
