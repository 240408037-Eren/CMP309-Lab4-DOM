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
  // Clear previous rendered tasks safely
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
    toggleBtn.addEventListener("click", () => {
      taskManager.toggleTask(task.id);
      renderTasks();
    });

    // 5. Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      taskManager.removeTask(task.id);
      renderTasks();
    });

    // Assemble buttons and task div
    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(deleteBtn);

    taskDiv.appendChild(titleSpan);
    taskDiv.appendChild(btnGroup);

    // Append to taskList container
    taskList.appendChild(taskDiv);
  });
}

/**
 * Handles the Load Tasks button click event.
 * Uses async/await with try/catch error handling,
 * performs JSON serialization round-trip, creates Task instances,
 * updates TaskManager, and triggers DOM render.
 */
async function handleLoadTasks() {
  try {
    // 1. Update UI to loading state
    statusMessage.textContent = "Loading tasks...";
    loadTasksBtn.disabled = true;

    // 2. Fetch raw task data asynchronously
    const rawData = await fetchTasks();

    // 3. JSON Handling Requirement: stringify -> parse round trip
    const serializedJson = JSON.stringify(rawData);
    const parsedData = JSON.parse(serializedJson);

    // 4. Instantiate Task domain objects from parsed JSON
    const taskInstances = parsedData.map(
      (item) => new Task(item.id, item.title, item.completed)
    );

    // 5. Store in TaskManager immutably
    taskManager.setTasks(taskInstances);

    // 6. Render tasks to DOM
    renderTasks();

    // 7. Clear status message upon success
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Error: Failed to load tasks from server.";
    console.error("Task fetch error:", error);
  } finally {
    loadTasksBtn.disabled = false;
  }
}

// Bind event listener to Load Tasks button
if (loadTasksBtn) {
  loadTasksBtn.addEventListener("click", handleLoadTasks);
}
