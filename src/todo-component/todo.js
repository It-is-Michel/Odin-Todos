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
    if (typeof newTitle !== string) throw new Error("Title must be a string.");
    if (newTitle.length > 60) throw new Error("Max title length is 60 characters.");

    this.#title = newTitle;
  }
  get title() {
    return this.#title;
  }
};

export default Todo;