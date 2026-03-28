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
    if (todoData.desc) this.desc = todoData.desc;
    if (todoData.subTasks) this.subTasks = todoData.subTasks;
    if (todoData.note) this.note = todoData.note;
    if (todoData.successCriteria) this.successCriteria = todoData.successCriteria;
    if (todoData.priority) this.priority = todoData.priority;
    if (todoData.dueDate) this.dueDate = todoData.dueDate;
    if (todoData.dueDateAlerts) this.dueDateAlerts = todoData.dueDateAlerts;
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

    const newSubTasksCopy = [];

    newSubTasks.forEach((subTask) => {
      if (!(subTask instanceof Task)) throw new Error("SubTask must be Task.");

      newSubTasksCopy.push(new Task(subTask.desc, subTask.type));
    });
    
    this.#subTasks = newSubTasksCopy;
  }
  get subTasks() {
    return new Task(this.#subTasks);
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

  set priority(newPriority) {
    if (typeof newPriority !== "number") throw new Error("Priority must be a number.");
    if (newPriority <= 0 || newPriority > 3) throw new Error("Priority must be a number between 1 and 3.");

    this.#priority = newPriority;
  }
  get priority() {
    return this.#priority;
  }

  set dueDate(newDueDate) {
    if (!(newDueDate instanceof Date)) throw new Error("Due date must be instance of Date.");
    if (isNaN(newDueDate.getTime())) throw new Error("Invalid date.");
    if (newDueDate < new Date()) throw new Error("Due date cannot be in the past.");

    const normalizedDueDate = new Date(newDueDate).setSeconds(0, 0);

    this.#dueDate = normalizedDueDate;
  }
  get dueDate() {
    return new Date(this.#dueDate);
  }

  set dueDateAlerts(newDueDateAlerts) {
    if (typeof newDueDateAlerts !== "array") throw new Error("Due date alerts must be an array.");

    this.#dueDateAlerts = this.#cloneDueDateAlerts(newDueDateAlerts);
  }
  get dueDateAlerts() {
    return this.#cloneDueDateAlerts(this.#dueDateAlerts);
  }

  #cloneDueDateAlerts(dueDateAlertsArray) {
    const dueDateAlertsArrayClone = [];

    dueDateAlertsArray.forEach((alert) => {
      if (!(alert instanceof Alert)) throw new Error("dueDateAlerts can only contain instances of Alert.");

      const alertCopy = new Alert(alert.message, alert.color, alert.alertOffset)
      dueDateAlertsArrayClone.push(alertCopy);
    });

    return dueDateAlertsArrayClone;
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

class Alert{
  /** @type {string} */
  #message;
  /** @type {string} */
  #color;
  /** @type {Date} */
  #alertOffset;

  constructor(message = null, color = null, alertOffset = null) {
    this.message = message;
    this.color = color;
    this.alertOffset = alertOffset;
  }

  set message(newMessage) {
    if (typeof newMessage !== "string") throw new Error("Message must be a string.");
    if (newMessage.length <= 0 || newMessage.length > 25) throw new Error("Max message length is 25 characters.");

    this.#message = newMessage;
  }
  get message() {
    return this.#message;
  }

  set color(newColor) {
    if (typeof newColor !== "string") throw new Error("Color must be a string.");
    // RegEx for hex (short form included), RGB and HSL color variables:
    const colorRegex = /^(?:#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})|rgb\(\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*\)|hsl\(\s*(?:3[0-5]\d|[12]?\d?\d)\s*,\s*(?:100|[1-9]?\d)%\s*,\s*(?:100|[1-9]?\d)%\s*\))$/i;
    if (!newColor.match(colorRegex)) throw new Error("Color must be a string representing a hexadecimal, RBG or HSL color variable (short hexadecimal form is allowed too).");

    this.#color = newColor;
  }
  get color() {
    return this.#color;
  }

  set alertOffset(newAlertOffset) {
    if (!(newAlertOffset instanceof Date)) throw new Error("Alert offset must be instance of Date.");
    if (isNaN(newAlertOffset.getTime())) throw new Error("Invalid date.");

    const normalizedAlertOffset = new Date(newAlertOffset).setSeconds(0, 0);

    this.#alertOffset = normalizedAlertOffset;
  }
  get alertOffset() {
    return new Date(this.#alertOffset);
  }
}

export default Todo;