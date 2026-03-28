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
};

export default Todo;