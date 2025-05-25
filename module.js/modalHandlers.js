/**
 * Opens the task details of the modal and puts the task's data inside
 * @param {object} task - The task to display
 * @param {string} task.title - The title of the task
 * @param {string} task.description - the task's description
 * @param {string} task.status - the current status of the task
 */
export function openTaskModal(task) {
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
 * Sets up the click event listner to close the task details modal
 */
export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("task-close-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Sets up the event listeners for opening and closing the "Add New Task" modal
 */
export function setupAddNewTaskModalHandler() {
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
