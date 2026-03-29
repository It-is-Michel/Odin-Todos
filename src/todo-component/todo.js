class Todo {
  /** @type {string} */
  #title;
  /** @type {string} */
  #desc;
  /** @type {array} */
  #subtasks = [];
  /** @type {string} */
  #note;
  /** @type {string} */
  #successCriteria;
  /** @type {number} */
  #priority;
  /** @type {Date} */
  #dueDate;
  /** @type {array} */
  #dueDateAlerts = [];
  /** @type {boolean} */
  #done;

  constructor(todoData) {
    this.#done = false;
    this.title = todoData.title;
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

    this.#dueDateAlerts.forEach(alert => {
      if (newAlert == alert) return false;
    });

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
    if (typeof desc !== "string") throw new Error("Description must be a string.");
    if (desc.length === 0) throw new Error("Description can't be empty.");
    if (type !== "check" && type !== "range") throw new Error("Type must be 'check' or 'range.");

    this.#subtasks.push(new Task(desc, type));
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

  toJSON() {
    return JSON.stringify([this.#desc, this.#type]);
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
    this.message = message;
    this.alertOffset = alertOffset;
    this.color = color;
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

  valueOf() {
    return `message: ${this.#message}; alertOffset: ${this.#alertOffset}; color: ${this.#color}`;
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
}

export default Todo;