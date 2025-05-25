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

export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("task-close-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

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
