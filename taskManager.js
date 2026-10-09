/**
 * Task Model Class
 * Represents an individual task entity.
 * Enforces id immutability via Object.defineProperty.
 */
class Task {
  constructor(id, title, completed = false) {
    Object.defineProperty(this, 'id', {
      value: id,
      writable: false,
      configurable: false,
      enumerable: true
    });
    this.title = title;
    this.completed = Boolean(completed);
  }

  /**
   * Toggles completion status and returns a new Task instance.
   * Preserves immutability without mutating this instance.
   * @returns {Task} New Task instance with inverted completed state
   */
  toggle() {
    return new Task(this.id, this.title, !this.completed);
  }
}

/**
 * TaskManager Class
 * Manages collections of Task instances using immutable array operations.
 */
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  /**
   * Replaces existing tasks immutably.
   * @param {Task[]} tasks - Array of Task instances
   */
  setTasks(tasks) {
    this.tasks = [...tasks];
  }

  /**
   * Appends a new task immutably.
   * @param {Task} task - Task instance to add
   */
  addTask(task) {
    this.tasks = [...this.tasks, task];
  }

  /**
   * Removes a task by ID immutably using Array.prototype.filter.
   * @param {number} taskId - ID of the task to remove
   */
  removeTask(taskId) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
  }

  /**
   * Toggles completion for a task by ID immutably using Array.prototype.map.
   * @param {number} taskId - ID of the task to toggle
   */
  toggleTask(taskId) {
    this.tasks = this.tasks.map((t) => (t.id === taskId ? t.toggle() : t));
  }
}

// Support Node.js / CommonJS testing environment if imported outside browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Task, TaskManager };
}
