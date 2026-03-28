import { th } from "date-fns/locale";

class TodoUI {

};

class TodoAlertService {

};

class Todo {
  /** @type {string} */
  #title;
  /** @type {string} */
  #desc;
  /** @type {array} */
  #subTasks;
  /** @type {string} */
  #note;
  /** @type {string} */
  #successCriteria;
  /** @type {number} */
  #priority;
  /** @type {Date} */
  #dueDate;
  /** @type {array} */
  #dueDateAlerts;

  constructor(todoData) {
    this.title = todoData.title;
    this.desc = todoData.desc;
    this.subTasks = todoData.subTasks;
    this.note = todoData.note;
    this.successCriteria = todoData.successCriteria;
    this.priority = todoData.priority;
    this.dueDate = todoData.dueDate;
    this.dueDateAlerts = todoData.dueDateAlerts;
  }

  set title(newTitle) {
    if (typeof newTitle !== "string") throw new Error("Title must be a string.");
    if (newTitle.length > 60) throw new Error("Max title length is 60 characters.");

    this.#title = newTitle;
  }
  get title() {
    return this.#title;
  }

  set desc(newDesc) {
    if (typeof newDesc !== "string") throw new Error("Description must be a string.");
    if (newDesc.length > 1000) throw new Error("Max description length is 1000 characters.");

    this.#desc = newDesc;
  }
  get desc() {
    return this.#desc;
  }

  set subTasks(newSubTasks) {
    if (typeof newSubTasks !== "array") throw new Error("SubTasks must be an array.");
    for (subTask of newSubTasks) {
      if (!subTask instanceof Task) throw new Error("SubTask must be Task.");
    }
    this.#subTasks = newSubTasks;
  }
  get subTasks() {
    return this.#subTasks;
  }

  set note(newNote) {
    if (typeof note !== "string") throw new Error("Note must be a string.");
    if (note.length > 1000) throw new Error("Max note length is 1000 characters.");

    this.#note = newNote;
  }
  get note() {
    return this.#note;
  }

  set successCriteria(newSuccessCriteria) {
    if (typeof newSuccessCriteria !== "string") throw new Error("Success criteria must be a string.");
    if (newSuccessCriteria.length > 1000) throw new Error("Max success criteria length is 1000 characters.");

    this.#successCriteria = newSuccessCriteria;
  }
  get successCriteria() {
    return this.#successCriteria;
  }
};

class Task{
  #desc;
  #type;

  constructor(desc, type) {
    this.desc = desc;
    this.type = type;
  }

  set desc(newDesc) {
    if (typeof newDesc !== "string") throw new Error("Description must be a string.");
    if (newDesc.length > 100) throw new Error("Max description length is 100 characters.");

    this.#desc = newDesc;
  }
  get desc() {
    return this.#desc;
  }

  set type(newType) {
    if (typeof newType !== "string") throw new Error("Type must be a string.");
    if (newType !== "check" && newType !== "range") throw new Error("Type must be 'check' or 'range'.");

    this.#type = newType;
  }
  get type() {
    return this.#type;
  }
}

export default Todo;