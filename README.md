# CMP309 Web Programming — Assignment 4
**Dynamic Task Dashboard**  
**Student:** Eren Ozan Yazar  
**Student ID:** 240408037  

---

## 1. Project Overview & File Organization

This project implements an interactive, single-page Dynamic Task Dashboard built with vanilla JavaScript (ES6+), semantic HTML, and CSS. The dashboard demonstrates asynchronous data loading, DOM manipulation and event handling, JSON serialization/deserialization, and strict state immutability patterns.

The solution is organized into the following files:

- **`index.html`**: Defines the semantic HTML structure. Contains the main container, heading (`Task Dashboard`), the load button (`#loadTasksBtn`), a live status message paragraph (`#statusMessage`), and the dynamic task list container (`#taskList`).
- **`styles.css`**: Provides a clean, modern user interface. Implements responsive layout spacing, button hover states, card borders, and clear visual differentiation for completed tasks (line-through title and soft green card styling).
- **`taskManager.js`**: Contains the object-oriented state management layer:
  - `Task`: Domain class modeling individual tasks. Enforces read-only property immutability on `id` using `Object.defineProperty()`. Features a `.toggle()` method that returns a brand new `Task` instance rather than mutating state in place.
  - `TaskManager`: Container class managing the array of tasks. Exposes `.setTasks()`, `.addTask()`, `.removeTask()`, and `.toggleTask()`. All state updates use immutable array methods (`[...]`, `.filter()`, and `.map()`), leaving the original array references untouched.
- **`api.js`**: Simulates a backend server endpoint. The `fetchTasks()` function returns a Promise that resolves after a 1500ms delay via `setTimeout()`, delivering mock student task records.
- **`main.js`**: Orchestrates UI events, asynchronous lifecycle, and DOM rendering:
  - Handles the `Load Tasks` click event with `async/await` and robust `try/catch` error handling.
  - Shows dynamic loading feedback (`Loading tasks...`) during network latency.
  - Implements the JSON requirement: serializes raw records with `JSON.stringify()`, parses them back with `JSON.parse()`, and instantiates `Task` domain objects.
  - Dynamically builds DOM elements using `document.createElement()`, safe `textContent`, and `appendChild()`.
  - Attaches event listeners to Toggle and Delete buttons, updating `TaskManager` immutably and triggering clean re-renders.

---

## 2. How to Run

No external dependencies, build tools, or frameworks are required.

### Option 1: Direct Browser Open
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local HTTP Server
If using a local development server:
```bash
# Using Python built-in server
python3 -m http.server 8000

# Or using Node.js npx
npx serve .
```
Navigate to `http://localhost:8000` in your web browser.

---

## 3. Challenges Faced & Solutions

1. **Enforcing Property Immutability in Object-Oriented JS:**
   - *Challenge:* Ensuring that task identifiers (`id`) cannot be modified after instantiation, while still maintaining clean object serialization and class methods.
   - *Solution:* Used `Object.defineProperty()` in the `Task` constructor with `writable: false`, `configurable: false`, and `enumerable: true`. To update task completion status, the `.toggle()` method creates and returns a brand-new `Task` instance (`return new Task(this.id, this.title, !this.completed)`), strictly avoiding in-place mutation.

2. **JSON Serialization Round-Trip:**
   - *Challenge:* Converting incoming data through JSON text serialization without losing domain method capabilities.
   - *Solution:* Handled the raw data through `JSON.stringify()` followed by `JSON.parse()`. Because parsed JSON returns plain object literals without class prototypes, mapped each plain object into a fresh `Task` instance via `parsedData.map(item => new Task(item.id, item.title, item.completed))`.

3. **Safe DOM Clearing and Preventing Memory Leaks:**
   - *Challenge:* Re-rendering the dynamic task list on every toggle and delete operation without causing DOM memory leaks or leaving orphaned elements.
   - *Solution:* Utilized `taskList.replaceChildren()` rather than `innerHTML = ''`. This safely flushes existing child nodes before appending freshly constructed task cards.

4. **Asynchronous UI Feedback & Error Handling:**
   - *Challenge:* Preventing multiple overlapping fetch requests while tasks are loading, and providing clear user feedback if network requests fail.
   - *Solution:* Wrapped `handleLoadTasks` in `try...catch...finally`. When the user clicks the button, the button is immediately disabled (`disabled = true`) and `#statusMessage` displays `"Loading tasks..."`. Upon completion, the button re-enables and the message clears; if an error occurs, a user-friendly error message is displayed.

---

## 4. Expected Console & DOM Behavior

1. **Initial State:** Empty task container with a single "Load Tasks" button.
2. **Click "Load Tasks":** Button is disabled, status displays `"Loading tasks..."` for 1.5 seconds.
3. **Data Arrival:** 3 tasks appear dynamically:
   - Task 1: "Study JavaScript" (Active, white card)
   - Task 2: "Practice DOM" (Completed, strikethrough, light green card)
   - Task 3: "Read Async Patterns" (Active, white card)
4. **Click "Toggle":** Instantly inverts task status between active and completed, updating classes and re-rendering.
5. **Click "Delete":** Permanently removes the selected task from state and DOM.
