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
