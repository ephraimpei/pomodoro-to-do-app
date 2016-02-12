import AppDispatcher from '../dispatcher/dispatcher.js';
import SearchConstants from "../constants/search_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class ToDoAutoCompleteStore extends EventEmitter {
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

  set (toDos) {
    this.toDos = toDos;
  }
}

const toDoAutoCompleteStore = new ToDoAutoCompleteStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case SearchConstants.RECEIVE_TO_DOS:
      toDoAutoCompleteStore.set(payload.toDos);
      break;
  }
});

export default toDoAutoCompleteStore;
