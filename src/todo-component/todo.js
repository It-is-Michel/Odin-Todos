class Todo {
  /** @type {string} */
  #title;
  /** @type {string} */
  #desc;
  /** @type {array} */
  #subtasks;
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
  /** @type {boolean} */
  #done;

  constructor(json = null) {
    this.#subtasks = [];
    this.#dueDateAlerts = [];
    this.#done = false;

    if (json) this.fromJSON(json);
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

  set note(newNote) {
    if (typeof newNote !== "string") throw new Error("Note must be a string.");
    if (newNote.length > 1000) throw new Error("Max note length is 1000 characters.");

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

  get done() {
    return this.#done;
  }

  addAlert(message, alertOffset, color) {
    const newAlert = new Alert(message, alertOffset, color);

    let alertIsDuplicated = false;
    this.#dueDateAlerts.forEach(alert => {
      alertIsDuplicated = newAlert.equals(alert);
    });

    if (alertIsDuplicated) return false;
    
    this.#dueDateAlerts.push(newAlert);
    return true;
  }

  removeAlert(index) {
    if (typeof index !== "number") throw new Error("Index must be a number.");
    const maxIndex = this.#dueDateAlerts.length - 1;
    if (index < 0 || index > maxIndex) throw new Error(`Index must be between 0 and ${maxIndex}`);

    this.#dueDateAlerts.splice(index, 1);
  }

  addSubtask(desc, type) {
    let newTask;

    if (type) {
      if (typeof desc !== "string") throw new Error("Description must be a string.");
      if (desc.length === 0) throw new Error("Description can't be empty.");
      if (type !== "check" && type !== "range") throw new Error("Type must be 'check' or 'range.");

      newTask = new Task(desc, type);
    } else {
      const json = desc;
      newTask = new Task(json);
    }

    let subtaskIsDuplicated = false;
    this.#subtasks.forEach(subtask => {
      subtaskIsDuplicated = subtask.equals(newTask);
    });

    if (subtaskIsDuplicated) return false;

    this.#subtasks.push(newTask);
    return true;
  }

  removeSubtask(index) {
    if (typeof index !== "number") throw new Error("Index must be a number.");
    const maxIndex = this.#subtasks.length - 1;
    if (index < 0 || index > maxIndex) throw new Error(`Index must be between 0 and ${maxIndex}`);

    this.#subtasks.splice(index, 1);
  }

  toggleDone() {
    this.#done = !this.#done;
  }

  toJSON() {
    const json = {
      title: this.#title,
      desc: this.#desc,
      subtasks: [],
      note: this.#note,
      successCriteria: this.#successCriteria,
      priority: this.#priority,
      dueDate: this.#dueDate,
      dueDateAlerts: [],
      done: this.#done,
    };

    this.#subtasks.forEach(task => {
      json["subtasks"].push(task.toJSON());
    });

    this.#dueDateAlerts.forEach(alert => {
      json["dueDateAlerts"].push(alert.toJSON());
    });

    return JSON.stringify(json);
  }

  fromJSON(json) {
    const data = JSON.parse(json);

    this.title = data.title;
    this.desc = data.desc;
    data.subtasks.forEach(taskJSON => this.addSubtask(taskJSON));
    this.note = data.note;
    this.successCriteria = data.successCriteria;
    this.priority = data.priority;
    this.dueDate = new Date(data.dueDate);
    data.dueDateAlerts.forEach(alertJSON => this.addAlert(alertJSON));
    this.#done = data.done;
  }
};

class Task{
  #desc;
  #type;

  constructor(desc, type = null) {
    if (type) {
      this.desc = desc;
      this.type = type;
    } else {
      this.fromJSON(desc);
    }
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

  equals(other) {
    return (
      this.#desc == other.desc
      && this.#type == other.type
    );
  }

  toJSON() {
    return JSON.stringify([this.#desc, this.#type]);
  }

  fromJSON(json) {
    const data = JSON.parse(json);

    this.desc = data[0];
    this.type = data[1];
  }
}

class Alert{
  /** @type {string} */
  #message;
  /** @type {object} */
  #alertOffset;
  /** @type {string} */
  #color;

  constructor(message, alertOffset, color) {
    if (alertOffset) {
      this.message = message;
      this.alertOffset = alertOffset;
      this.color = color;
    } else {
      const json = message;
      this.fromJSON(json);
    }
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
    if (typeof newAlertOffset !== "object") throw new Error("Alert offset must be an object.");

    this.#alertOffset = this.#copyAlertOffset(newAlertOffset);
  }
  get alertOffset() {
    return this.#copyAlertOffset(this.#alertOffset);
  }

  equals(other) {
    return this.#message == other.message
      && JSON.stringify(this.#alertOffset) == JSON.stringify(other.alertOffset)
      && this.#color == other.color;
  }

  #copyAlertOffset(alertOffset) {
    const alertOffsetCopy = {
      years: alertOffset.years ? alertOffset.years : 0,
      months: alertOffset.months ? alertOffset.months : 0,
      days: alertOffset.days ? alertOffset.days : 0,
      hours: alertOffset.hours ? alertOffset.hours : 0,
      minutes: alertOffset.minutes ? alertOffset.minutes : 0,
    };

    for (const key in alertOffsetCopy) {
      if (alertOffsetCopy[key] < 0) throw new Error("Alert offset can't have negative values.");
    }

    return alertOffsetCopy;
  }

  toJSON() {
    return JSON.stringify([this.#message, this.#alertOffset, this.#color]);
  }

  fromJSON(json) {
    const data = JSON.parse(json);

    this.message = data[0];
    this.alertOffset = data[1];
    this.color = data[2];
  }
}

export default Todo;