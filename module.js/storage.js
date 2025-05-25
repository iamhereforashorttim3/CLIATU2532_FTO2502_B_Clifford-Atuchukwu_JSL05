import { initialTasks } from "./initialData.js";

export function getUserData() {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : [...initialTasks];
}

export function saveUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}
