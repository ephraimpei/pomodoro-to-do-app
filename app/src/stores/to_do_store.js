import AppDispatcher from '../dispatcher/dispatcher.js';
import ToDoConstants from "../constants/to_do_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class ToDoStore extends EventEmitter {
  constructor () {
    super();
    this.toDos = [];
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get () {
    return this.toDos.slice();
  }

  add (toDo) {
    const findToDo = this.toDos.find((el) => el.to_do_id.$oid === toDo.to_do_id.$oid);

    if (typeof(findUser) === 'undefined') { this.toDos.push(toDo); }

    this.emit(CHANGE_EVENT);
  }

  remove (toDo) {
    debugger;
    const toDoIdx = this.toDos.findIndex((el) => el.to_do_id.$oid === toDo.to_do_id.$oid);

    if (toDoIdx !== -1) { this.toDos.splice(toDoIdx, 1);}

    this.emit(CHANGE_EVENT);
  }

  set (toDos) {
    this.toDos = toDos;

    this.emit(CHANGE_EVENT);
  }
}

const toDoStore = new ToDoStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case ToDoConstants.RECEIVE_TO_DOS:
      toDoStore.set(payload.toDos);
      break;
    case ToDoConstants.RECEIVE_TO_DO:
      toDoStore.add(payload.toDo);
      break;
    case ToDoConstants.DELETE_TO_DO:
      toDoStore.remove(payload.toDo);
      break;
  }
});

export default toDoStore;
