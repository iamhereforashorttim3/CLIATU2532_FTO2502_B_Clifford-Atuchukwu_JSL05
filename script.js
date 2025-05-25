import { initialTasks } from "./initialData.js";

/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 * @returns {HTMLElement} The created task div element.
 */
function createTaskElement(task) {
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
 * Finds the task container element based on task status.
 * @param {string} status - The task status ('todo', 'doing', or 'done').
 * @returns {HTMLElement|null} The container element, or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders all tasks from initial data to the UI.
 * Groups tasks by status and appends them to their respective columns.
 * @param {Array<Object>} tasks - Array of task objects.
 */
function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * Opens the modal dialog with pre-filled task details.
 * @param {Object} task - The task object to display in the modal.
 */
function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}

/**
 * Sets up modal close behavior.
 */
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("task-close-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Initializes the task board and modal handlers.
 */

function setupAddNewTaskModalHandler() {
  const addNewTaskBtn = document.getElementById("add-btn");
  const addNewTaskModal = document.getElementById("add-new-task-modal");

  addNewTaskBtn.addEventListener("click", () => {
    addNewTaskModal.showModal();
  });

  const closeBtn = addNewTaskModal.querySelector(".add-close-btn");
  closeBtn.addEventListener("click", () => {
    addNewTaskModal.close();
  });
}

document.addEventListener("DOMContentLoaded", initTaskBoard);

function initTaskBoard() {
  clearExistingTasks();

  let userDataString = localStorage.getItem("userData");
  let userData;

  if (userDataString) {
    userData = JSON.parse(userDataString);
  } else {
    userData = initialTasks;
    localStorage.setItem("userData", JSON.stringify(initialTasks));
  }

  renderTasks(userData);
  setupModalCloseHandler();
  setupAddNewTaskModalHandler();
  setupCreateTaskHandler();
}

function setupCreateTaskHandler() {
  const form = document.getElementById("add-new-task-form");
  const titleInput = document.getElementById("title-enter");
  const descInput = document.getElementById("entering-description");
  const statusSelect = document.getElementById("add-task-status");
  const modal = document.getElementById("add-new-task-modal");

  const createTaskBtn = document.getElementById("create-task");
  createTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      status: statusSelect.value,
    };

    if (!newTask.title) {
      alert("Please Enter a title");
      return;
    }

    const currentData = JSON.parse(localStorage.getItem("userData")) || [];
    currentData.push(newTask);
    localStorage.setItem("userData", JSON.stringify(currentData));

    clearExistingTasks();
    renderTasks(currentData);

    modal.close();
    form.reset();
  });
}
