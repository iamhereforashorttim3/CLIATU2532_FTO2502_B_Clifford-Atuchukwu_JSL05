import { initialTasks } from "./initialData.js";

/**
 * Retrieves task data from the localStorage
 * Goes to the default initialTasks if nothing is stored
 */
export function getUserData() {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : [...initialTasks];
}

/**
 * Saves data of tasks to localStorage
 */
export function saveUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}
