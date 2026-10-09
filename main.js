// Initialize single TaskManager instance
const taskManager = new TaskManager();

// Cache DOM elements
const loadTasksBtn = document.getElementById("loadTasksBtn");
const statusMessage = document.getElementById("statusMessage");
const taskList = document.getElementById("taskList");

/**
 * Renders the tasks stored in taskManager to the DOM.
 * Clears existing list using replaceChildren and constructs new elements
 * using document.createElement and appendChild.
 */
function renderTasks() {
  // Clear previous rendered tasks
  taskList.replaceChildren();

  taskManager.tasks.forEach((task) => {
    // 1. Task container div
    const taskDiv = document.createElement("div");
    taskDiv.className = task.completed ? "task completed" : "task";
    taskDiv.dataset.id = task.id;

    // 2. Title span
    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;

    // 3. Button group container
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    // 4. Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = "Toggle";

    // 5. Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Assemble buttons and task div
    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(deleteBtn);

    taskDiv.appendChild(titleSpan);
    taskDiv.appendChild(btnGroup);

    // Append to taskList container
    taskList.appendChild(taskDiv);
  });
}
