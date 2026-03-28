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