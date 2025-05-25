import { initialTasks } from "./initialData.js";
import { clearExistingTasks, renderTasks } from "./domUtility.js";
import {
  setupModalCloseHandler,
  setupAddNewTaskModalHandler,
} from "./modalHandlers.js";
import { getUserData, saveUserData } from "./storage.js";
/**
 * Loads the data of the user
 * renders and processes the tasks
 * sets up handlers for the modal
 */
export function initTaskBoard() {
  let userData = getUserData();
  renderTasks(userData);
  setupModalCloseHandler();
  setupAddNewTaskModalHandler();
  setupCreateTaskHandler();
}

/**
 * The process of creating a new task:
 * it validates the input
 * places it into the localStorage
 * Renders the task
 * closes the modal and resets for the next task
 */
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

    const currentData = getUserData();
    currentData.push(newTask);
    saveUserData(currentData);

    clearExistingTasks();
    renderTasks(currentData);
    modal.close();
    form.reset();
  });
}
