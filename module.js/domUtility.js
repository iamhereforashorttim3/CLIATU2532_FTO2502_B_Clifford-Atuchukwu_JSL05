import { openTaskModal } from "./modalHandlers.js";

/**
 * This creates a task DOM element with a click handler for the modal
 * @param {object}
 * @param {number} task.id
 * @param {string} task.title
 * @param {string} task.status
 * @returns {HTMLElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}
/**
 * Returns the container element for the given status
 * @param {string} status  - 'todo' | 'doing' | 'done'
 * @returns  {HTMLElement | null}
 */
export function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 *  Clears tasks from the DOM to prevent duplicates when re-rendered
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * It renders tasks in their respective status columns
 */
export function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}
