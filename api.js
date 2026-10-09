/**
 * Simulated Asynchronous Server API
 * Simulates network latency with setTimeout and resolves raw task data.
 * @returns {Promise<Array<{id: number, title: string, completed: boolean}>>}
 */
function fetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Study JavaScript", completed: false },
        { id: 2, title: "Practice DOM", completed: true },
        { id: 3, title: "Read Async Patterns", completed: false }
      ]);
    }, 1500);
  });
}

// Support Node.js / CommonJS testing environment if imported outside browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchTasks };
}
